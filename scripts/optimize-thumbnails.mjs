#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'public/thumbnails'
const OUT_DIR = 'public/thumbnails/optimized'
const WIDTHS = [320, 640, 960]
const QUALITY = 78

async function isUpToDate(srcPath, outPaths) {
    try {
        const srcStat = await fs.stat(srcPath)
        const outStats = await Promise.all(outPaths.map(p => fs.stat(p)))
        return outStats.every(s => s.mtimeMs >= srcStat.mtimeMs)
    } catch {
        return false
    }
}

async function processOne(file) {
    const ext = path.extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null

    const base = path.basename(file, ext)
    const srcPath = path.join(SRC_DIR, file)
    const outPaths = WIDTHS.map(w => path.join(OUT_DIR, `${base}-${w}.webp`))

    if (await isUpToDate(srcPath, outPaths)) {
        return { file, skipped: true }
    }

    const input = sharp(srcPath)
    const meta = await input.metadata()

    await Promise.all(
        WIDTHS.map((w, i) => {
            // Don't upscale: cap width at the source's native width
            const targetW = Math.min(w, meta.width || w)
            return sharp(srcPath)
                .resize({ width: targetW, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outPaths[i])
        })
    )

    return { file, skipped: false }
}

async function main() {
    await fs.mkdir(OUT_DIR, { recursive: true })
    const files = await fs.readdir(SRC_DIR)

    const results = []
    for (const file of files) {
        const full = path.join(SRC_DIR, file)
        const stat = await fs.stat(full)
        if (!stat.isFile()) continue
        const result = await processOne(file)
        if (result) results.push(result)
    }

    const built = results.filter(r => !r.skipped).length
    const skipped = results.filter(r => r.skipped).length
    console.log(
        `optimize-thumbnails: ${built} built, ${skipped} up-to-date (in ${OUT_DIR})`
    )
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})

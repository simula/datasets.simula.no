import path from 'path'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// loadAllDatasets caches at module level. We use vi.resetModules() to get
// a fresh cache per test, and chdir into the fixtures dir so `datasets`
// (the relative path baked into the loader) resolves to our fixtures.
const FIXTURES_DIR = path.resolve(__dirname, '..', '..', 'fixtures')

let originalCwd

beforeEach(() => {
    originalCwd = process.cwd()
    process.chdir(FIXTURES_DIR)
    vi.resetModules()
})

afterEach(() => {
    process.chdir(originalCwd)
})

describe('loadAllDatasets', () => {
    it('reads every .md file in datasets/ and returns slug + frontmatter + content', async () => {
        const { loadAllDatasets } = await import('../../../src/utils/datasets')
        const all = loadAllDatasets()

        expect(all).toHaveLength(4)
        const slugs = all.map(d => d.slug).sort()
        expect(slugs).toEqual(['alpha', 'beta', 'delta', 'gamma'])

        const alpha = all.find(d => d.slug === 'alpha')
        expect(alpha.frontmatter.title).toBe('Alpha Dataset')
        expect(alpha.frontmatter.tags).toEqual(['health', 'video'])
        expect(alpha.content).toContain('alpha')
    })

    it('attaches an ISO-string mtime to each frontmatter', async () => {
        const { loadAllDatasets } = await import('../../../src/utils/datasets')
        const all = loadAllDatasets()

        for (const d of all) {
            expect(typeof d.frontmatter.mtime).toBe('string')
            // ISO strings parseable as a valid date.
            expect(Number.isNaN(Date.parse(d.frontmatter.mtime))).toBe(false)
        }
    })

    it('preserves frontmatter.hidden so callers can filter on it', async () => {
        const { loadAllDatasets } = await import('../../../src/utils/datasets')
        const all = loadAllDatasets()
        const beta = all.find(d => d.slug === 'beta')
        expect(beta.frontmatter.hidden).toBe(true)
    })

    it('returns the cached array on subsequent calls (same reference)', async () => {
        const { loadAllDatasets } = await import('../../../src/utils/datasets')
        const a = loadAllDatasets()
        const b = loadAllDatasets()
        expect(b).toBe(a)
    })
})

describe('loadDataset', () => {
    it('returns the dataset matching the given slug', async () => {
        const { loadDataset } = await import('../../../src/utils/datasets')
        const gamma = loadDataset('gamma')
        expect(gamma).toBeDefined()
        expect(gamma.slug).toBe('gamma')
        expect(gamma.frontmatter.title).toBe('Gamma Dataset')
        expect(gamma.content).toContain('Gamma')
    })

    it('returns undefined for an unknown slug', async () => {
        const { loadDataset } = await import('../../../src/utils/datasets')
        expect(loadDataset('nonexistent')).toBeUndefined()
    })
})

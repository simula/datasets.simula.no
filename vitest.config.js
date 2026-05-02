import { defineConfig } from 'vitest/config'
import { transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const ROOT = path.resolve(__dirname)
const SRC = path.join(ROOT, 'src')

// Vite 7's vite:oxc transformer keys JSX detection off the file extension
// (filepath.endsWith('x')), so JSX written inside our .js source files
// (e.g. src/components/dataset-card.js) parses as plain JS and fails.
// Force-transform those files as JSX before vite:oxc gets a chance.
const jsxInJsPlugin = {
    name: 'datasets-jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
        const [filepath] = id.split('?')
        if (!filepath.startsWith(SRC)) return null
        if (!filepath.endsWith('.js')) return null
        const result = await transformWithOxc(code, filepath, {
            lang: 'jsx',
            jsx: { runtime: 'automatic', importSource: 'react' }
        })
        return { code: result.code, map: result.map }
    }
}

export default defineConfig({
    plugins: [jsxInJsPlugin, react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.js'],
        include: [
            'tests/unit/**/*.{test,spec}.{js,jsx}',
            'tests/integration/**/*.{test,spec}.{js,jsx}'
        ],
        exclude: ['node_modules', '.next', 'out', 'tests/e2e']
    }
})

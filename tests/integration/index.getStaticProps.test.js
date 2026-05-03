import path from 'path'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Run getStaticProps against the fixture datasets/ tree. Uses chdir so
// the relative `datasets` path inside loadAllDatasets resolves to our
// tests/fixtures/datasets/ instead of the real repo data, and
// resetModules so the module-level cache in datasets.js doesn't carry
// between tests.
const FIXTURES_ROOT = path.resolve(__dirname, '..', 'fixtures')

let originalCwd

beforeEach(() => {
    originalCwd = process.cwd()
    process.chdir(FIXTURES_ROOT)
    vi.resetModules()
})

afterEach(() => {
    process.chdir(originalCwd)
})

describe('home page getStaticProps', () => {
    it('returns datasets and facetCounts as props', async () => {
        const { getStaticProps } = await import('../../src/pages/index')
        const result = await getStaticProps()

        expect(result).toHaveProperty('props')
        expect(result.props).toHaveProperty('datasets')
        expect(result.props).toHaveProperty('facetCounts')
    })

    it('includes hidden datasets in props.datasets (so the client can re-derive)', async () => {
        const { getStaticProps } = await import('../../src/pages/index')
        const { props } = await getStaticProps()
        const slugs = props.datasets.map(d => d.slug).sort()
        expect(slugs).toEqual(['alpha', 'beta', 'delta', 'gamma'])
    })

    it('strips the markdown body from each dataset entry to keep static props small', async () => {
        const { getStaticProps } = await import('../../src/pages/index')
        const { props } = await getStaticProps()
        for (const d of props.datasets) {
            expect(d).not.toHaveProperty('content')
            expect(Object.keys(d).sort()).toEqual(['frontmatter', 'slug'])
        }
    })

    it('counts tags per facet across visible datasets only (excludes hidden)', async () => {
        const { getStaticProps } = await import('../../src/pages/index')
        const { props } = await getStaticProps()
        // Fixtures: alpha=[health, video], beta=[health] hidden,
        // gamma=[sports, video], delta=[sports]. Hidden beta's "health"
        // does NOT count.
        expect(props.facetCounts).toEqual({
            domain: { health: 1, sports: 2 },
            modality: { video: 2 },
            task: {}
        })
    })

    it('attaches an ISO-string mtime to each dataset frontmatter', async () => {
        const { getStaticProps } = await import('../../src/pages/index')
        const { props } = await getStaticProps()
        for (const d of props.datasets) {
            expect(typeof d.frontmatter.mtime).toBe('string')
            expect(Number.isNaN(Date.parse(d.frontmatter.mtime))).toBe(false)
        }
    })
})

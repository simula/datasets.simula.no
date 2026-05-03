import { FACETS } from '../data/tags.js'

export const VALID_SORTS = ['recent', 'az', 'za']

const FACET_KEYS = FACETS.map(f => f.key)

// Read URL query params into a normalized filter state. Each facet has
// its own repeatable param (?domain=health&modality=video) so the three
// dimensions are independently shareable in the URL.
export function readFilterState(searchString) {
    const sp = new URLSearchParams(searchString || '')
    const sort = sp.get('sort')
    const facets = {}
    for (const key of FACET_KEYS) facets[key] = sp.getAll(key)
    return {
        q: sp.get('q') || '',
        facets,
        sort: VALID_SORTS.includes(sort) ? sort : 'recent',
    }
}

// AND across facets, OR within each facet — the standard faceted-search
// semantic. Selecting `domain=health domain=sports` finds health-OR-sports
// datasets; adding `modality=video` narrows that to ones that ALSO have video.
export function filterDatasets({ datasets, search, facets }) {
    const needle = (search || '').toLowerCase().trim()
    const safeFacets = facets || {}

    return datasets.filter(d => {
        for (const { key, field } of FACETS) {
            const selected = safeFacets[key] || []
            if (selected.length === 0) continue
            const dValues = d.frontmatter[field] || []
            if (!selected.some(t => dValues.includes(t))) return false
        }
        if (!needle) return true
        const fm = d.frontmatter
        const allTags = [
            ...(fm.domain || []),
            ...(fm.modality || []),
            ...(fm.tasks || []),
        ]
        return (
            fm.title.toLowerCase().includes(needle) ||
            fm.desc?.toLowerCase().includes(needle) ||
            allTags.some(t => t.toLowerCase().includes(needle))
        )
    })
}

export function sortDatasets(datasets, sort) {
    const out = datasets.slice()
    if (sort === 'az') {
        out.sort((a, b) =>
            a.frontmatter.title.localeCompare(b.frontmatter.title)
        )
    } else if (sort === 'za') {
        out.sort((a, b) =>
            b.frontmatter.title.localeCompare(a.frontmatter.title)
        )
    } else {
        out.sort(
            (a, b) =>
                new Date(b.frontmatter.mtime).getTime() -
                new Date(a.frontmatter.mtime).getTime()
        )
    }
    return out
}

export const VALID_SORTS = ['recent', 'az', 'za']

export function readFilterState(searchString) {
    const sp = new URLSearchParams(searchString || '')
    const sort = sp.get('sort')
    return {
        q: sp.get('q') || '',
        tags: sp.getAll('tag'),
        sort: VALID_SORTS.includes(sort) ? sort : 'recent'
    }
}

export function filterDatasets({ datasets, search, tags }) {
    const needle = (search || '').toLowerCase().trim()
    const tagSet = new Set(tags || [])

    return datasets
        .filter(d => {
            if (tagSet.size === 0) return true
            const dTags = new Set(d.frontmatter.tags || [])
            for (const t of tagSet) if (!dTags.has(t)) return false
            return true
        })
        .filter(d => {
            if (!needle) return true
            return (
                d.frontmatter.title.toLowerCase().includes(needle) ||
                d.frontmatter.desc?.toLowerCase().includes(needle) ||
                d.frontmatter.tags?.some(t => t.toLowerCase().includes(needle))
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

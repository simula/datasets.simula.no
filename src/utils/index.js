const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
})

// Renders an absolute "Mon YYYY" label. Used in place of relative time
// strings so SSG output doesn't bake in stale "2 weeks ago" text that
// drifts out of sync with reality between deploys.
export function formatMonthYear(time) {
    if (!time) return ''
    const d = time instanceof Date ? time : new Date(time)
    if (Number.isNaN(d.getTime())) return ''
    return MONTH_YEAR.format(d)
}

export function countTags(datasets) {
    const counts = {}
    for (const d of datasets) {
        for (const tag of d.frontmatter.tags || []) {
            counts[tag] = (counts[tag] || 0) + 1
        }
    }
    return counts
}

export function findRelatedDatasets(target, allDatasets, limit = 3) {
    const targetTags = new Set(target.frontmatter.tags || [])
    if (targetTags.size === 0) return []

    return allDatasets
        .filter(d => d.slug !== target.slug && !d.frontmatter.hidden)
        .map(d => {
            const overlap = (d.frontmatter.tags || []).filter(t =>
                targetTags.has(t)
            ).length
            return { dataset: d, overlap }
        })
        .filter(x => x.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, limit)
        .map(x => x.dataset)
}

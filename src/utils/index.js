import { FACETS } from '../data/tags.js'

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

export function allTagsFor(frontmatter) {
    return [
        ...(frontmatter.domain || []),
        ...(frontmatter.modality || []),
        ...(frontmatter.tasks || []),
    ]
}

// Per-facet tag counts: { domain: { health: 18, ... }, modality: {...}, task: {...} }.
// Powers the option counts in each FacetDropdown.
export function countFacets(datasets) {
    const counts = {}
    for (const { key, field } of FACETS) {
        const bucket = {}
        for (const d of datasets) {
            for (const tag of d.frontmatter[field] || []) {
                bucket[tag] = (bucket[tag] || 0) + 1
            }
        }
        counts[key] = bucket
    }
    return counts
}

export function findRelatedDatasets(target, allDatasets, limit = 3) {
    const targetTags = new Set(allTagsFor(target.frontmatter))
    if (targetTags.size === 0) return []

    return allDatasets
        .filter(d => d.slug !== target.slug && !d.frontmatter.hidden)
        .map(d => {
            const overlap = allTagsFor(d.frontmatter).filter(t =>
                targetTags.has(t)
            ).length
            return { dataset: d, overlap }
        })
        .filter(x => x.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, limit)
        .map(x => x.dataset)
}

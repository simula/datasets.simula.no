import { describe, it, expect } from 'vitest'
import {
    formatMonthYear,
    countFacets,
    findRelatedDatasets
} from '../../../src/utils/index'

describe('formatMonthYear', () => {
    it('returns empty string for null/undefined/empty input', () => {
        expect(formatMonthYear(null)).toBe('')
        expect(formatMonthYear(undefined)).toBe('')
        expect(formatMonthYear('')).toBe('')
    })

    it('returns empty string for invalid date input', () => {
        expect(formatMonthYear('not-a-date')).toBe('')
        expect(formatMonthYear('2024-99-99')).toBe('')
    })

    it('formats an ISO date string as "Mon YYYY"', () => {
        // Pick mid-month / mid-day timestamps so the test is stable across
        // local timezones (TZs east of UTC roll late-of-month UTC dates
        // into the next month locally, which would flake the assertion).
        expect(formatMonthYear('2024-01-15T12:00:00Z')).toBe('Jan 2024')
        expect(formatMonthYear('2024-07-04T12:00:00Z')).toBe('Jul 2024')
        expect(formatMonthYear('2025-12-15T12:00:00Z')).toBe('Dec 2025')
    })

    it('accepts a Date instance', () => {
        const d = new Date('2023-03-15T12:00:00Z')
        expect(formatMonthYear(d)).toBe('Mar 2023')
    })

    it('accepts a numeric timestamp (ms since epoch)', () => {
        const ts = Date.UTC(2022, 5, 15, 12) // 2022-06-15T12:00Z
        expect(formatMonthYear(ts)).toBe('Jun 2022')
    })
})

describe('countFacets', () => {
    const empty = { domain: {}, modality: {}, task: {} }

    it('returns empty per-facet objects for an empty array', () => {
        expect(countFacets([])).toEqual(empty)
    })

    it('returns empty per-facet objects when no datasets carry tags', () => {
        const datasets = [
            { frontmatter: { title: 'A' } },
            { frontmatter: { title: 'B', domain: [], modality: [], tasks: [] } }
        ]
        expect(countFacets(datasets)).toEqual(empty)
    })

    it('counts repeated tags within their facet', () => {
        const datasets = [
            { frontmatter: { domain: ['health'], modality: ['video'] } },
            { frontmatter: { domain: ['health'], modality: ['images'] } },
            { frontmatter: { domain: ['sports'], modality: ['video'] } }
        ]
        expect(countFacets(datasets)).toEqual({
            domain: { health: 2, sports: 1 },
            modality: { video: 2, images: 1 },
            task: {}
        })
    })

    it('treats missing facet arrays as no contribution', () => {
        const datasets = [
            { frontmatter: { domain: ['health'] } },
            { frontmatter: {} },
            { frontmatter: { domain: ['health', 'sports'], tasks: ['vqa'] } }
        ]
        expect(countFacets(datasets)).toEqual({
            domain: { health: 2, sports: 1 },
            modality: {},
            task: { vqa: 1 }
        })
    })
})

describe('findRelatedDatasets', () => {
    const mk = (slug, { domain = [], modality = [], tasks = [], hidden = false } = {}) => ({
        slug,
        frontmatter: { title: slug, domain, modality, tasks, hidden }
    })

    it('returns [] when the target has no tags across any facet', () => {
        const target = mk('target')
        const all = [mk('a', { domain: ['health'] }), mk('b', { modality: ['video'] })]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })

    it('returns [] when the target has no facet fields at all', () => {
        const target = { slug: 'target', frontmatter: { title: 'target' } }
        const all = [mk('a', { domain: ['health'] })]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })

    it('excludes the target itself by slug', () => {
        const target = mk('target', { domain: ['health'] })
        const all = [
            mk('target', { domain: ['health'] }),
            mk('other', { domain: ['health'] })
        ]
        const result = findRelatedDatasets(target, all)
        expect(result).toHaveLength(1)
        expect(result[0].slug).toBe('other')
    })

    it('excludes hidden datasets', () => {
        const target = mk('target', { domain: ['health'] })
        const all = [
            mk('vis', { domain: ['health'] }),
            mk('hid', { domain: ['health'], hidden: true })
        ]
        const result = findRelatedDatasets(target, all)
        expect(result.map(d => d.slug)).toEqual(['vis'])
    })

    it('sorts by overlap descending across all facets combined', () => {
        const target = mk('target', {
            domain: ['health'],
            modality: ['video'],
            tasks: ['segmentation']
        })
        const all = [
            mk('one-overlap', { domain: ['health'] }),
            mk('three-overlap', {
                domain: ['health'],
                modality: ['video'],
                tasks: ['segmentation']
            }),
            mk('two-overlap', { domain: ['health'], modality: ['video'] })
        ]
        const result = findRelatedDatasets(target, all)
        expect(result.map(d => d.slug)).toEqual([
            'three-overlap',
            'two-overlap',
            'one-overlap'
        ])
    })

    it('respects the limit argument', () => {
        const target = mk('target', { domain: ['health'] })
        const all = [
            mk('one', { domain: ['health'] }),
            mk('two', { domain: ['health'] }),
            mk('three', { domain: ['health'] }),
            mk('four', { domain: ['health'] })
        ]
        expect(findRelatedDatasets(target, all, 2)).toHaveLength(2)
        expect(findRelatedDatasets(target, all, 1)).toHaveLength(1)
    })

    it('defaults the limit to 3', () => {
        const target = mk('target', { domain: ['health'] })
        const all = [
            mk('one', { domain: ['health'] }),
            mk('two', { domain: ['health'] }),
            mk('three', { domain: ['health'] }),
            mk('four', { domain: ['health'] })
        ]
        expect(findRelatedDatasets(target, all)).toHaveLength(3)
    })

    it('returns [] when no candidate shares any tag in any facet', () => {
        const target = mk('target', { domain: ['health'] })
        const all = [
            mk('x', { domain: ['sports'] }),
            mk('y', { modality: ['text'] })
        ]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })
})

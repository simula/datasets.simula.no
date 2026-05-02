import { describe, it, expect } from 'vitest'
import {
    formatMonthYear,
    countTags,
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

describe('countTags', () => {
    it('returns an empty object for an empty array', () => {
        expect(countTags([])).toEqual({})
    })

    it('returns an empty object when no datasets carry tags', () => {
        const datasets = [
            { frontmatter: { title: 'A' } },
            { frontmatter: { title: 'B', tags: [] } }
        ]
        expect(countTags(datasets)).toEqual({})
    })

    it('counts repeated tags across datasets', () => {
        const datasets = [
            { frontmatter: { tags: ['medical', 'video'] } },
            { frontmatter: { tags: ['medical'] } },
            { frontmatter: { tags: ['video', 'soccer'] } }
        ]
        expect(countTags(datasets)).toEqual({
            medical: 2,
            video: 2,
            soccer: 1
        })
    })

    it('treats missing tags as no contribution', () => {
        const datasets = [
            { frontmatter: { tags: ['a'] } },
            { frontmatter: {} }, // tags undefined
            { frontmatter: { tags: ['a', 'b'] } }
        ]
        expect(countTags(datasets)).toEqual({ a: 2, b: 1 })
    })
})

describe('findRelatedDatasets', () => {
    const mk = (slug, tags, { hidden = false } = {}) => ({
        slug,
        frontmatter: { title: slug, tags, hidden }
    })

    it('returns [] when the target has no tags', () => {
        const target = mk('target', [])
        const all = [mk('a', ['x']), mk('b', ['y'])]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })

    it('returns [] when the target has undefined tags', () => {
        const target = { slug: 'target', frontmatter: { title: 'target' } }
        const all = [mk('a', ['x'])]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })

    it('excludes the target itself by slug', () => {
        const target = mk('target', ['a'])
        const all = [mk('target', ['a']), mk('other', ['a'])]
        const result = findRelatedDatasets(target, all)
        expect(result).toHaveLength(1)
        expect(result[0].slug).toBe('other')
    })

    it('excludes hidden datasets', () => {
        const target = mk('target', ['a'])
        const all = [mk('vis', ['a']), mk('hid', ['a'], { hidden: true })]
        const result = findRelatedDatasets(target, all)
        expect(result.map(d => d.slug)).toEqual(['vis'])
    })

    it('sorts by tag-overlap descending', () => {
        const target = mk('target', ['a', 'b', 'c'])
        const all = [
            mk('one-overlap', ['a', 'z']),
            mk('three-overlap', ['a', 'b', 'c']),
            mk('two-overlap', ['a', 'b', 'z'])
        ]
        const result = findRelatedDatasets(target, all)
        expect(result.map(d => d.slug)).toEqual([
            'three-overlap',
            'two-overlap',
            'one-overlap'
        ])
    })

    it('respects the limit argument', () => {
        const target = mk('target', ['a'])
        const all = [
            mk('one', ['a']),
            mk('two', ['a']),
            mk('three', ['a']),
            mk('four', ['a'])
        ]
        expect(findRelatedDatasets(target, all, 2)).toHaveLength(2)
        expect(findRelatedDatasets(target, all, 1)).toHaveLength(1)
    })

    it('defaults the limit to 3', () => {
        const target = mk('target', ['a'])
        const all = [
            mk('one', ['a']),
            mk('two', ['a']),
            mk('three', ['a']),
            mk('four', ['a'])
        ]
        expect(findRelatedDatasets(target, all)).toHaveLength(3)
    })

    it('returns [] when no candidate shares any tag', () => {
        const target = mk('target', ['a'])
        const all = [mk('x', ['b']), mk('y', ['c'])]
        expect(findRelatedDatasets(target, all)).toEqual([])
    })
})

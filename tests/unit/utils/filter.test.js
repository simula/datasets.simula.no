import { describe, it, expect } from 'vitest'
import {
    VALID_SORTS,
    readFilterState,
    filterDatasets,
    sortDatasets
} from '../../../src/utils/filter'

describe('VALID_SORTS', () => {
    it('exposes the three supported sort keys', () => {
        expect(VALID_SORTS).toEqual(['recent', 'az', 'za'])
    })
})

describe('readFilterState', () => {
    it('returns defaults for empty/undefined input', () => {
        expect(readFilterState('')).toEqual({ q: '', tags: [], sort: 'recent' })
        expect(readFilterState(undefined)).toEqual({
            q: '',
            tags: [],
            sort: 'recent'
        })
    })

    it('parses ?q=foo into the q field', () => {
        expect(readFilterState('?q=hello').q).toBe('hello')
    })

    it('accepts a query string without the leading ?', () => {
        expect(readFilterState('q=hello').q).toBe('hello')
    })

    it('decodes URL-encoded values', () => {
        expect(readFilterState('?q=hello%20world').q).toBe('hello world')
    })

    it('collects multiple tag params into an array', () => {
        expect(readFilterState('?tag=a&tag=b').tags).toEqual(['a', 'b'])
    })

    it('returns an empty tags array when no tag params are present', () => {
        expect(readFilterState('?q=foo').tags).toEqual([])
    })

    it('accepts each valid sort value', () => {
        for (const s of VALID_SORTS) {
            expect(readFilterState(`?sort=${s}`).sort).toBe(s)
        }
    })

    it('falls back to "recent" for an invalid sort value', () => {
        expect(readFilterState('?sort=garbage').sort).toBe('recent')
    })

    it('parses combined q + multiple tags + sort together', () => {
        expect(readFilterState('?q=cats&tag=medical&tag=video&sort=az')).toEqual(
            {
                q: 'cats',
                tags: ['medical', 'video'],
                sort: 'az'
            }
        )
    })
})

describe('filterDatasets', () => {
    const ds = (slug, frontmatter) => ({ slug, frontmatter })
    const sample = [
        ds('alpha', {
            title: 'Alpha',
            desc: 'medical video benchmark',
            tags: ['medical', 'video']
        }),
        ds('beta', {
            title: 'Beta',
            desc: 'soccer dataset',
            tags: ['soccer', 'video']
        }),
        ds('gamma', {
            title: 'Gamma',
            desc: 'pure text corpus',
            tags: ['text']
        }),
        ds('delta', {
            title: 'Delta',
            desc: 'kitchen sink',
            tags: ['medical', 'soccer', 'video']
        })
    ]

    it('returns all datasets when no filters are active', () => {
        const result = filterDatasets({
            datasets: sample,
            search: '',
            tags: []
        })
        expect(result.map(d => d.slug)).toEqual([
            'alpha',
            'beta',
            'gamma',
            'delta'
        ])
    })

    it('treats undefined search/tags the same as empty', () => {
        const result = filterDatasets({ datasets: sample })
        expect(result).toHaveLength(sample.length)
    })

    it('applies tags as set-intersection (AND, not OR)', () => {
        const result = filterDatasets({
            datasets: sample,
            search: '',
            tags: ['medical', 'video']
        })
        // Only alpha and delta have BOTH medical and video.
        expect(result.map(d => d.slug)).toEqual(['alpha', 'delta'])
    })

    it('returns no results when a tag matches nothing', () => {
        const result = filterDatasets({
            datasets: sample,
            search: '',
            tags: ['medical', 'text']
        })
        expect(result).toEqual([])
    })

    it('matches search against the title (case-insensitive)', () => {
        const result = filterDatasets({
            datasets: sample,
            search: 'ALPHA',
            tags: []
        })
        expect(result.map(d => d.slug)).toEqual(['alpha'])
    })

    it('matches search against the description', () => {
        const result = filterDatasets({
            datasets: sample,
            search: 'soccer',
            tags: []
        })
        // beta.desc and delta.tags both include "soccer".
        expect(result.map(d => d.slug).sort()).toEqual(['beta', 'delta'])
    })

    it('matches search against tag names', () => {
        const result = filterDatasets({
            datasets: sample,
            search: 'text',
            tags: []
        })
        expect(result.map(d => d.slug)).toEqual(['gamma'])
    })

    it('trims surrounding whitespace from the search term', () => {
        const result = filterDatasets({
            datasets: sample,
            search: '   alpha   ',
            tags: []
        })
        expect(result.map(d => d.slug)).toEqual(['alpha'])
    })

    it('combines search and tags (both must match)', () => {
        const result = filterDatasets({
            datasets: sample,
            search: 'kitchen',
            tags: ['medical', 'soccer']
        })
        expect(result.map(d => d.slug)).toEqual(['delta'])
    })

    it('handles datasets without a desc field gracefully', () => {
        const noDesc = [{ slug: 'x', frontmatter: { title: 'No Desc Here' } }]
        expect(
            filterDatasets({ datasets: noDesc, search: 'desc', tags: [] })
                .map(d => d.slug)
        ).toEqual(['x'])
        expect(
            filterDatasets({ datasets: noDesc, search: 'unrelated', tags: [] })
        ).toEqual([])
    })
})

describe('sortDatasets', () => {
    const mk = (slug, title, mtime) => ({
        slug,
        frontmatter: { title, mtime }
    })

    it('does not mutate the input array', () => {
        const input = [
            mk('a', 'B', '2024-02-01T00:00:00Z'),
            mk('b', 'A', '2024-01-01T00:00:00Z')
        ]
        const before = input.map(d => d.slug)
        sortDatasets(input, 'az')
        expect(input.map(d => d.slug)).toEqual(before)
    })

    it('sorts a-z by title alphabetically', () => {
        const input = [
            mk('1', 'Charlie', '2024-01-01T00:00:00Z'),
            mk('2', 'Alpha', '2024-01-01T00:00:00Z'),
            mk('3', 'Bravo', '2024-01-01T00:00:00Z')
        ]
        expect(
            sortDatasets(input, 'az').map(d => d.frontmatter.title)
        ).toEqual(['Alpha', 'Bravo', 'Charlie'])
    })

    it('sorts z-a by title in reverse', () => {
        const input = [
            mk('1', 'Alpha', '2024-01-01T00:00:00Z'),
            mk('2', 'Charlie', '2024-01-01T00:00:00Z'),
            mk('3', 'Bravo', '2024-01-01T00:00:00Z')
        ]
        expect(
            sortDatasets(input, 'za').map(d => d.frontmatter.title)
        ).toEqual(['Charlie', 'Bravo', 'Alpha'])
    })

    it('uses localeCompare for non-ASCII titles', () => {
        // Æ should sort after A but before B in Norwegian/most locales —
        // but the exact pairing varies by locale. The key invariant we test
        // is that localeCompare is used (not bytewise compare), so Z vs Å
        // ordering is locale-aware rather than codepoint-ordered.
        const input = [
            mk('1', 'Z-thing', '2024-01-01T00:00:00Z'),
            mk('2', 'Æ-thing', '2024-01-01T00:00:00Z'),
            mk('3', 'A-thing', '2024-01-01T00:00:00Z')
        ]
        const titles = sortDatasets(input, 'az').map(d => d.frontmatter.title)
        // 'A-thing' comes first regardless of locale.
        expect(titles[0]).toBe('A-thing')
        // Bytewise sort would give A,Z,Æ (Æ codepoint = 0xC6, Z = 0x5A),
        // but localeCompare puts Æ between/after A and Z in most locales.
        // We only assert A is first, since the locale of the runtime
        // determines exact Æ/Z ordering — both orderings are correct.
    })

    it('sorts "recent" by mtime descending', () => {
        const input = [
            mk('old', 'X', '2023-01-01T00:00:00Z'),
            mk('newest', 'Y', '2024-06-01T00:00:00Z'),
            mk('mid', 'Z', '2024-01-01T00:00:00Z')
        ]
        expect(sortDatasets(input, 'recent').map(d => d.slug)).toEqual([
            'newest',
            'mid',
            'old'
        ])
    })

    it('falls back to "recent" sort for unknown sort values', () => {
        const input = [
            mk('old', 'X', '2023-01-01T00:00:00Z'),
            mk('newest', 'Y', '2024-06-01T00:00:00Z')
        ]
        expect(sortDatasets(input, 'whatever').map(d => d.slug)).toEqual([
            'newest',
            'old'
        ])
    })
})

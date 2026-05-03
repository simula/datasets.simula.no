import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { FiSearch, FiX, FiFrown } from 'react-icons/fi'
import DatasetCard from '../components/dataset-card'
import FacetDropdown from '../components/facet-dropdown'
import { countFacets } from '../utils'
import { loadAllDatasets } from '../utils/datasets'
import { FACETS, TAG_LABEL } from '../data/tags'
import {
    VALID_SORTS,
    readFilterState,
    filterDatasets,
    sortDatasets
} from '../utils/filter'

const FACET_KEYS = FACETS.map(f => f.key)
const EMPTY_FACETS = Object.fromEntries(FACET_KEYS.map(k => [k, []]))

export async function getStaticProps() {
    // Strip `content` — the home page only needs frontmatter, and shipping
    // the full markdown body of every dataset would bloat the static props.
    const datasets = loadAllDatasets().map(({ slug, frontmatter }) => ({
        slug,
        frontmatter
    }))

    const visibleDatasets = datasets.filter(d => !d.frontmatter.hidden)
    const facetCounts = countFacets(visibleDatasets)

    return {
        props: {
            datasets,
            facetCounts
        }
    }
}

function readFacetsFromQuery(query) {
    const out = {}
    for (const key of FACET_KEYS) {
        const v = query[key]
        out[key] = Array.isArray(v) ? v : v ? [v] : []
    }
    return out
}

export default function Home({ datasets, facetCounts }) {
    const router = useRouter()
    const searchInputRef = useRef(null)

    // Read URL filters synchronously on the first client render so a
    // direct hit on /?domain=health paints the filtered grid in one pass
    // instead of flashing the unfiltered list. Server (SSG) has no
    // `window` and falls back to defaults — that's the SSG output.
    const [initialFilters] = useState(() =>
        typeof window === 'undefined'
            ? { q: '', facets: EMPTY_FACETS, sort: 'recent' }
            : readFilterState(window.location.search)
    )

    // Once router.isReady fires, router.query becomes authoritative.
    // Until then, fall back to the URL we read at mount.
    const filters = useMemo(() => {
        if (!router.isReady) return initialFilters
        const { q, sort: s } = router.query
        return {
            q: typeof q === 'string' ? q : '',
            facets: readFacetsFromQuery(router.query),
            sort: typeof s === 'string' && VALID_SORTS.includes(s) ? s : 'recent'
        }
    }, [router.isReady, router.query, initialFilters])
    const { q: searchValue, facets: selectedFacets, sort } = filters

    const updateQuery = useCallback(
        (next, mode = 'push') => {
            const query = {}
            if (next.q) query.q = next.q
            for (const key of FACET_KEYS) {
                const vals = next.facets?.[key]
                if (vals && vals.length > 0) query[key] = vals
            }
            if (next.sort && next.sort !== 'recent') query.sort = next.sort
            const nav = mode === 'replace' ? router.replace : router.push
            nav({ pathname: '/', query }, undefined, {
                shallow: true,
                scroll: false
            })
        },
        [router]
    )

    // Search input updates every keystroke — replace to avoid history spam.
    // Facet/sort changes are discrete actions — push so back-button walks them.
    const setSearchValue = q =>
        updateQuery({ q, facets: selectedFacets, sort }, 'replace')
    const setSort = s =>
        updateQuery({ q: searchValue, facets: selectedFacets, sort: s })

    // '/' keyboard shortcut to focus search
    useEffect(() => {
        const onKeyDown = e => {
            if (e.key !== '/') return
            const active = document.activeElement
            const tagName = active?.tagName
            if (
                tagName === 'INPUT' ||
                tagName === 'TEXTAREA' ||
                active?.isContentEditable
            )
                return
            e.preventDefault()
            searchInputRef.current?.focus()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const visibleDatasets = useMemo(
        () => datasets.filter(d => !d.frontmatter.hidden),
        [datasets]
    )

    const filteredDatasets = useMemo(
        () =>
            sortDatasets(
                filterDatasets({
                    datasets: visibleDatasets,
                    search: searchValue,
                    facets: selectedFacets
                }),
                sort
            ),
        [visibleDatasets, searchValue, selectedFacets, sort]
    )

    const handleClearSearch = () => setSearchValue('')

    const setFacet = useCallback(
        (key, vals) => {
            updateQuery({
                q: searchValue,
                facets: { ...selectedFacets, [key]: vals },
                sort
            })
        },
        [searchValue, selectedFacets, sort, updateQuery]
    )

    // Card pills click: route the click through the right facet param.
    const handleTagClick = useCallback(
        ({ tag, facet }) => {
            const current = selectedFacets[facet] || []
            const next = current.includes(tag)
                ? current.filter(t => t !== tag)
                : [...current, tag]
            setFacet(facet, next)
        },
        [selectedFacets, setFacet]
    )

    const handleClearAll = () => {
        updateQuery({ q: '', facets: EMPTY_FACETS, sort })
    }

    const totalSelected = FACET_KEYS.reduce(
        (n, k) => n + (selectedFacets[k]?.length || 0),
        0
    )
    const hasFilters = searchValue || totalSelected > 0

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Head>
                <title>Simula Datasets</title>
                <meta
                    name="description"
                    content={`Browse ${visibleDatasets.length} research datasets gathered and published by Simula Research Laboratory and SimulaMet.`}
                />
            </Head>

            {/* Hero */}
            <div className="mb-6 text-center sm:mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    Simula Datasets
                </h1>
                <div className="mx-auto mt-3 h-1 w-12 bg-primary" aria-hidden="true" />
                <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:mt-5 sm:text-lg">
                    Browse {visibleDatasets.length} research datasets gathered and
                    published by Simula Research Laboratory and SimulaMet.
                </p>
            </div>

            {/* Sticky filter bar */}
            <div className="sticky top-0 z-10 -mx-4 mb-6 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 sm:py-4">
                {/* Search input */}
                <div>
                    <label htmlFor="search-input" className="sr-only">
                        Search datasets
                    </label>
                    <div className="relative mx-auto flex h-11 w-full max-w-2xl items-center rounded-lg border border-gray-300 bg-white px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                        <FiSearch
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <input
                            id="search-input"
                            ref={searchInputRef}
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                            type="text"
                            placeholder="Search by name, description, or tag..."
                            className="h-full flex-1 border-none bg-transparent px-3 text-base focus:outline-hidden"
                        />
                        <kbd
                            className="mr-1 hidden rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-500 sm:inline-block"
                            aria-hidden="true"
                        >
                            /
                        </kbd>
                        {searchValue && (
                            <button
                                onClick={handleClearSearch}
                                className="rounded-sm p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                                aria-label="Clear search"
                            >
                                <FiX className="h-4 w-4" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Facet dropdowns + sort/clear, all on one controls row */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:mt-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {FACETS.map(facet => {
                            const counts = facetCounts[facet.key] || {}
                            const options = facet.tags.map(tag => ({
                                tag,
                                label: TAG_LABEL[tag] || tag,
                                count: counts[tag] || 0
                            }))
                            return (
                                <FacetDropdown
                                    key={facet.key}
                                    label={facet.label}
                                    options={options}
                                    selected={selectedFacets[facet.key] || []}
                                    onChange={vals => setFacet(facet.key, vals)}
                                />
                            )
                        })}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Sort</span>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="min-h-9 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="recent">Recently updated</option>
                            <option value="az">Title A–Z</option>
                            <option value="za">Title Z–A</option>
                        </select>
                    </label>
                </div>

                {/* Results status line + clear */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                    <p role="status" aria-live="polite">
                        Showing <span className="font-medium text-gray-900">{filteredDatasets.length}</span> of{' '}
                        {visibleDatasets.length} datasets
                        {totalSelected > 0 && (
                            <>
                                {' '}filtered by{' '}
                                {FACETS.flatMap(f =>
                                    (selectedFacets[f.key] || []).map(t => (
                                        <span
                                            key={`${f.key}:${t}`}
                                            className="font-medium text-gray-900"
                                        >
                                            {TAG_LABEL[t] || t}
                                        </span>
                                    ))
                                ).reduce((acc, el, i) =>
                                    i === 0 ? [el] : [...acc, ', ', el], []
                                )}
                            </>
                        )}
                    </p>
                    {hasFilters && (
                        <button
                            onClick={handleClearAll}
                            className="underline-offset-2 hover:text-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Dataset grid or empty state */}
            {filteredDatasets.length > 0 ? (
                <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDatasets.map((dataset, i) => (
                        <DatasetCard
                            key={dataset.slug}
                            dataset={dataset}
                            onTagClick={handleTagClick}
                            priority={i < 8}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-16 text-center">
                    <FiFrown
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        No datasets found
                    </h3>
                    <p className="mt-2 text-gray-500">
                        Try adjusting your search or filters to find what
                        you&apos;re looking for.
                    </p>
                    <button
                        onClick={handleClearAll}
                        className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}

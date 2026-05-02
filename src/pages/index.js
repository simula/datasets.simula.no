import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { FiSearch, FiX, FiFrown } from 'react-icons/fi'
import DatasetCard from '../components/dataset-card'
import { countTags } from '../utils'
import { loadAllDatasets } from '../utils/datasets'
import {
    VALID_SORTS,
    readFilterState,
    filterDatasets,
    sortDatasets
} from '../utils/filter'

const TAG_COLLAPSE_THRESHOLD = 12

export async function getStaticProps() {
    // Strip `content` — the home page only needs frontmatter, and shipping
    // the full markdown body of every dataset would bloat the static props.
    const datasets = loadAllDatasets().map(({ slug, frontmatter }) => ({
        slug,
        frontmatter
    }))

    const visibleDatasets = datasets.filter(d => !d.frontmatter.hidden)
    const tagCounts = countTags(visibleDatasets)
    const allTags = Object.keys(tagCounts).sort()

    return {
        props: {
            datasets,
            allTags,
            tagCounts
        }
    }
}

export default function Home({ datasets, allTags, tagCounts }) {
    const router = useRouter()
    const searchInputRef = useRef(null)

    const [showAllTags, setShowAllTags] = useState(false)

    // Read URL filters synchronously on the first client render so a
    // direct hit on /?tag=soccer paints the filtered grid in one pass
    // instead of flashing the unfiltered list. Server (SSG) has no
    // `window` and falls back to defaults — that's the SSG output.
    const [initialFilters] = useState(() =>
        typeof window === 'undefined'
            ? { q: '', tags: [], sort: 'recent' }
            : readFilterState(window.location.search)
    )

    // Once router.isReady fires, router.query becomes authoritative.
    // Until then, fall back to the URL we read at mount.
    const filters = useMemo(() => {
        if (!router.isReady) return initialFilters
        const { q, tag, sort: s } = router.query
        return {
            q: typeof q === 'string' ? q : '',
            tags: Array.isArray(tag) ? tag : tag ? [tag] : [],
            sort: typeof s === 'string' && VALID_SORTS.includes(s) ? s : 'recent'
        }
    }, [router.isReady, router.query, initialFilters])
    const { q: searchValue, tags: selectedTags, sort } = filters

    const updateQuery = useCallback(
        (next, mode = 'push') => {
            const query = {}
            if (next.q) query.q = next.q
            if (next.tags && next.tags.length > 0) query.tag = next.tags
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
    // Tag/sort changes are discrete actions — push so back-button walks them.
    const setSearchValue = q =>
        updateQuery({ q, tags: selectedTags, sort }, 'replace')
    const setSort = s =>
        updateQuery({ q: searchValue, tags: selectedTags, sort: s })

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
                    tags: selectedTags
                }),
                sort
            ),
        [visibleDatasets, searchValue, selectedTags, sort]
    )

    const handleClearSearch = () => setSearchValue('')

    // Stable identity so DatasetCard's React.memo holds across renders.
    // selectedTags moves through filters via the router, not closure, so
    // we read it fresh from a ref-style ladder via filters above.
    const handleTagClick = useCallback(
        tag => {
            const next = selectedTags.includes(tag)
                ? selectedTags.filter(t => t !== tag)
                : [...selectedTags, tag]
            updateQuery({ q: searchValue, tags: next, sort })
        },
        [selectedTags, searchValue, sort, updateQuery]
    )

    const handleClearAll = () => {
        updateQuery({ q: '', tags: [], sort })
    }

    const tagsToRender = showAllTags
        ? allTags
        : allTags.slice(0, TAG_COLLAPSE_THRESHOLD)
    const hasFilters = searchValue || selectedTags.length > 0

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
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    Simula Datasets
                </h1>
                <div className="mx-auto mt-3 h-1 w-12 bg-primary" aria-hidden="true" />
                <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
                    Browse {visibleDatasets.length} research datasets gathered and
                    published by Simula Research Laboratory and SimulaMet.
                </p>
            </div>

            {/* Sticky filter bar */}
            <div className="sticky top-0 z-10 -mx-4 mb-6 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
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

                {/* Tag filters */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {tagsToRender.map(tag => {
                        const isActive = selectedTags.includes(tag)
                        return (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                aria-pressed={isActive}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                                    isActive
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <span>{tag}</span>
                                <span
                                    className={`text-xs ${
                                        isActive ? 'text-white/80' : 'text-gray-400'
                                    }`}
                                >
                                    {tagCounts[tag]}
                                </span>
                            </button>
                        )
                    })}
                    {allTags.length > TAG_COLLAPSE_THRESHOLD && (
                        <button
                            onClick={() => setShowAllTags(s => !s)}
                            className="inline-flex items-center rounded-full border border-dashed border-gray-300 px-3 py-1 text-sm text-gray-600 hover:border-primary hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            {showAllTags
                                ? 'Show less'
                                : `Show all (${allTags.length})`}
                        </button>
                    )}
                </div>

                {/* Results count + sort + clear */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p
                        className="text-sm text-gray-500"
                        role="status"
                        aria-live="polite"
                    >
                        Showing <span className="font-medium text-gray-900">{filteredDatasets.length}</span> of{' '}
                        {visibleDatasets.length} datasets
                        {selectedTags.length > 0 && (
                            <>
                                {' '}
                                tagged{' '}
                                {selectedTags.map((t, i) => (
                                    <span key={t}>
                                        {i > 0 && ' + '}
                                        <span className="font-medium text-gray-900">
                                            {t}
                                        </span>
                                    </span>
                                ))}
                            </>
                        )}
                    </p>
                    <div className="flex items-center gap-3">
                        {hasFilters && (
                            <button
                                onClick={handleClearAll}
                                className="text-sm text-gray-500 underline-offset-2 hover:text-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Clear all
                            </button>
                        )}
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Sort</span>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="recent">Recently updated</option>
                                <option value="az">Title A–Z</option>
                                <option value="za">Title Z–A</option>
                            </select>
                        </label>
                    </div>
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

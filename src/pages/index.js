import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import DatasetCard from '../components/dataset-card'
import { countTags } from '../utils'

const TAG_COLLAPSE_THRESHOLD = 12

export async function getStaticProps() {
    const files = fs.readdirSync('datasets')

    const datasets = files.map(fileName => {
        const slug = fileName.replace('.md', '')
        const filepath = `datasets/${fileName}`
        const readFile = fs.readFileSync(filepath, 'utf-8')
        const stats = fs.statSync(filepath)
        const { data: frontmatter } = matter(readFile)
        frontmatter.mtime = stats.mtime.toISOString()
        return {
            slug,
            frontmatter
        }
    })

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

    // Derive filter state from URL query params (single source of truth).
    // During SSG and the first client render router.query is empty, so values
    // fall back to defaults — matches server output, then re-derives once
    // router.isReady fires.
    const searchValue =
        typeof router.query.q === 'string' ? router.query.q : ''
    const selectedTags = (() => {
        const tag = router.query.tag
        if (!tag) return []
        return Array.isArray(tag) ? tag : [tag]
    })()
    const sort =
        typeof router.query.sort === 'string' &&
        ['recent', 'az', 'za'].includes(router.query.sort)
            ? router.query.sort
            : 'recent'

    const updateQuery = next => {
        const query = {}
        if (next.q) query.q = next.q
        if (next.tags && next.tags.length > 0) query.tag = next.tags
        if (next.sort && next.sort !== 'recent') query.sort = next.sort
        router.replace({ pathname: '/', query }, undefined, {
            shallow: true,
            scroll: false
        })
    }

    const setSearchValue = q =>
        updateQuery({ q, tags: selectedTags, sort })
    const setSort = s =>
        updateQuery({ q: searchValue, tags: selectedTags, sort: s })
    const setSelectedTags = tags =>
        updateQuery({ q: searchValue, tags, sort })

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

    const filteredDatasets = useMemo(() => {
        const search = searchValue.toLowerCase().trim()
        const tagSet = new Set(selectedTags)

        const matched = visibleDatasets
            .filter(d => {
                if (tagSet.size === 0) return true
                const dTags = new Set(d.frontmatter.tags || [])
                for (const t of tagSet) if (!dTags.has(t)) return false
                return true
            })
            .filter(d => {
                if (!search) return true
                return (
                    d.frontmatter.title.toLowerCase().includes(search) ||
                    d.frontmatter.desc?.toLowerCase().includes(search) ||
                    d.frontmatter.tags?.some(t => t.toLowerCase().includes(search))
                )
            })

        if (sort === 'az') {
            matched.sort((a, b) =>
                a.frontmatter.title.localeCompare(b.frontmatter.title)
            )
        } else if (sort === 'za') {
            matched.sort((a, b) =>
                b.frontmatter.title.localeCompare(a.frontmatter.title)
            )
        } else {
            matched.sort(
                (a, b) =>
                    new Date(b.frontmatter.mtime).getTime() -
                    new Date(a.frontmatter.mtime).getTime()
            )
        }

        return matched
    }, [visibleDatasets, searchValue, selectedTags, sort])

    const handleClearSearch = () => setSearchValue('')

    const handleTagClick = tag => {
        const next = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag]
        setSelectedTags(next)
    }

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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
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
                    {filteredDatasets.map(dataset => (
                        <DatasetCard
                            key={dataset.slug}
                            dataset={dataset}
                            onTagClick={handleTagClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-16 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
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

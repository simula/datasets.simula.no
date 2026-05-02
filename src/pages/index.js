import { useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import { timeAgo } from '../utils'

export async function getStaticProps() {
    const files = fs.readdirSync('datasets')

    const datasets = files.map(fileName => {
        const slug = fileName.replace('.md', '')
        const filepath = `datasets/${fileName}`
        const readFile = fs.readFileSync(filepath, 'utf-8')
        const stats = fs.statSync(filepath)
        const { data: frontmatter } = matter(readFile)
        frontmatter.mtime = stats.mtime.toLocaleDateString()
        return {
            slug,
            frontmatter
        }
    })

    // Extract unique tags from all datasets
    const allTags = [
        ...new Set(
            datasets.flatMap(d => d.frontmatter.tags || [])
        )
    ].sort()

    return {
        props: {
            datasets,
            allTags
        }
    }
}

export default function Home({ datasets, allTags }) {
    const [searchValue, setSearchValue] = useState('')
    const [selectedTag, setSelectedTag] = useState(null)

    // Filter datasets
    const visibleDatasets = datasets.filter(d => !d.frontmatter.hidden)
    const filteredDatasets = visibleDatasets
        .filter(d => !selectedTag || d.frontmatter.tags?.includes(selectedTag))
        .filter(d => {
            if (!searchValue) return true
            const search = searchValue.toLowerCase()
            return (
                d.frontmatter.title.toLowerCase().includes(search) ||
                d.frontmatter.desc?.toLowerCase().includes(search) ||
                d.frontmatter.tags?.some(tag => tag.toLowerCase().includes(search))
            )
        })

    const handleClearSearch = () => {
        setSearchValue('')
    }

    const handleTagClick = tag => {
        setSelectedTag(selectedTag === tag ? null : tag)
    }

    const handleClearFilters = () => {
        setSearchValue('')
        setSelectedTag(null)
    }

    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl">Simula Datasets</h1>
                <h2 className="text-lg">
                    A collection of datasets gathered and published by <br />
                    Simula Research Laboratory and SimulaMet.
                </h2>

                {/* Search input */}
                <div className="mt-4">
                    <label htmlFor="search-input" className="sr-only">
                        Search datasets
                    </label>
                    <div className="relative mx-auto flex h-10 w-full max-w-md items-center rounded-md border border-gray-300 bg-slate-100 px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20">
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
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                            type="text"
                            placeholder="Search by name, description, or tag..."
                            className="h-full flex-1 border-none bg-transparent px-2 focus:outline-hidden"
                        />
                        {searchValue && (
                            <button
                                onClick={handleClearSearch}
                                className="rounded-sm p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
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
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`rounded-full px-3 py-1 text-sm transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                            selectedTag === null
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`rounded-full px-3 py-1 text-sm transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                                selectedTag === tag
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <p
                    className="mt-4 text-sm text-gray-500"
                    role="status"
                    aria-live="polite"
                >
                    Showing {filteredDatasets.length} of {visibleDatasets.length} datasets
                    {selectedTag && ` in "${selectedTag}"`}
                </p>
            </div>

            {/* Dataset grid or no results message */}
            {filteredDatasets.length > 0 ? (
                <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDatasets.map(props => (
                        <div
                            key={props.slug}
                            className="flex flex-col overflow-hidden rounded-md border border-gray-300 shadow-md transition duration-200 ease-in-out hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary"
                        >
                            <Link href={`/${props.slug}`} className="flex cursor-pointer flex-col overflow-hidden focus:outline-hidden">
                                    <div className="relative h-36 w-full overflow-hidden">
                                        <Image
                                            src={`${props.frontmatter.thumbnail}`}
                                            alt={props.frontmatter.title}
                                            height={144}
                                            width={308}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="h-8">
                                        <h3 className="mt-1 px-4 pt-2 text-lg font-medium leading-tight">
                                            {props.frontmatter.title}
                                        </h3>
                                    </div>
                                    <div className="h-16 px-4 pt-2 text-sm text-slate-600 line-clamp-3">
                                        {props.frontmatter.desc}
                                    </div>
                            </Link>
                            <div className="flex w-full flex-row justify-between px-4 pb-2 pt-4">
                                <div className="flex flex-row">
                                    {props.frontmatter.publication && (
                                        <a
                                            href={props.frontmatter.publication}
                                            aria-label={`View publication for ${props.frontmatter.title}`}
                                            className="mr-4 rounded-sm p-1 hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                                />
                                            </svg>
                                        </a>
                                    )}
                                    {props.frontmatter.github && (
                                        <a
                                            href={props.frontmatter.github}
                                            aria-label={`View GitHub repository for ${props.frontmatter.title}`}
                                            className="rounded-sm p-1 hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                                />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-end align-bottom text-xs text-gray-500">
                                    {timeAgo(props.frontmatter.mtime)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
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
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No datasets found</h3>
                    <p className="mt-2 text-gray-500">
                        Try adjusting your search or filter to find what you&apos;re looking for.
                    </p>
                    <button
                        onClick={handleClearFilters}
                        className="mt-4 rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-opacity-90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}

import { memo } from 'react'
import Link from 'next/link'
import { FiBookOpen, FiFolder, FiGithub } from 'react-icons/fi'
import { formatMonthYear } from '../utils'

const MAX_TAGS_ON_CARD = 3

// Build a webp srcset from /thumbnails/<name>.<ext> →
// /thumbnails/optimized/<name>-{320,640,960}.webp. Files are emitted by
// scripts/optimize-thumbnails.mjs at build time.
function buildWebpSources(thumbnail) {
    const match = thumbnail.match(/^\/thumbnails\/(.+)\.(png|jpe?g)$/i)
    if (!match) return null
    const base = match[1]
    return [320, 640, 960]
        .map(w => `/thumbnails/optimized/${base}-${w}.webp ${w}w`)
        .join(', ')
}

const SIZES =
    '(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'

function DatasetCard({ dataset, onTagClick, priority = false }) {
    const { slug, frontmatter } = dataset
    const tags = frontmatter.tags || []
    const visibleTags = tags.slice(0, MAX_TAGS_ON_CARD)
    const overflowCount = tags.length - visibleTags.length
    const webpSrcSet = frontmatter.thumbnail
        ? buildWebpSources(frontmatter.thumbnail)
        : null

    return (
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
            <Link
                href={`/${slug}`}
                className="flex flex-1 flex-col focus:outline-hidden"
            >
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                    {frontmatter.thumbnail ? (
                        <picture>
                            {webpSrcSet && (
                                <source
                                    type="image/webp"
                                    srcSet={webpSrcSet}
                                    sizes={SIZES}
                                />
                            )}
                            <img
                                src={frontmatter.thumbnail}
                                alt=""
                                width={320}
                                height={160}
                                loading={priority ? 'eager' : 'lazy'}
                                decoding="async"
                                fetchPriority={priority ? 'high' : 'auto'}
                                className="h-full w-full object-cover transition motion-safe:duration-300 motion-safe:group-hover:scale-105"
                            />
                        </picture>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-primary/40">
                            <FiFolder className="h-12 w-12" aria-hidden="true" />
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col px-4 pt-3">
                    <h3 className="min-h-[3rem] text-lg font-semibold leading-snug tracking-tight text-gray-900 line-clamp-2">
                        {frontmatter.title}
                    </h3>
                    <p className="mt-2 min-h-[3.75rem] flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                        {frontmatter.desc}
                    </p>
                </div>
            </Link>

            {visibleTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pt-3">
                    {visibleTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                onTagClick?.(tag)
                            }}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-primary hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            {tag}
                        </button>
                    ))}
                    {overflowCount > 0 && (
                        <span className="rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">
                            +{overflowCount}
                        </span>
                    )}
                </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
                <div className="flex items-center gap-1">
                    {frontmatter.publication && (
                        <a
                            href={frontmatter.publication}
                            aria-label={`View publication for ${frontmatter.title}`}
                            title="Publication"
                            className="rounded-sm p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <FiBookOpen className="h-4 w-4" aria-hidden="true" />
                        </a>
                    )}
                    {frontmatter.github && (
                        <a
                            href={frontmatter.github}
                            aria-label={`View GitHub repository for ${frontmatter.title}`}
                            title="GitHub"
                            className="rounded-sm p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <FiGithub className="h-4 w-4" aria-hidden="true" />
                        </a>
                    )}
                </div>
                <span className="text-xs text-gray-500">
                    {formatMonthYear(frontmatter.mtime)}
                </span>
            </div>
        </div>
    )
}

export default memo(DatasetCard)

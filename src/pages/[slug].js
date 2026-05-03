import Head from 'next/head'
import Link from 'next/link'
import { FiArrowLeft, FiBookOpen, FiGithub } from 'react-icons/fi'
import DatasetCard from '../components/dataset-card'
import { allTagsFor, findRelatedDatasets, formatMonthYear } from '../utils'
import { loadAllDatasets, loadDataset } from '../utils/datasets'
import { renderAndSanitize } from '../utils/markdown'
import { FACETS, TAG_LABEL } from '../data/tags'

const SITE_URL = 'https://datasets.simula.no'

export async function getStaticPaths() {
    const paths = loadAllDatasets().map(({ slug }) => ({ params: { slug } }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const { frontmatter, content } = loadDataset(slug)

    const html = renderAndSanitize(content)

    const related = findRelatedDatasets(
        { slug, frontmatter },
        loadAllDatasets(),
        3
    ).map(({ slug, frontmatter }) => ({ slug, frontmatter }))

    return {
        props: {
            slug,
            frontmatter,
            html,
            related
        }
    }
}

export default function DatasetPage({ slug, frontmatter, html, related }) {
    const tags = allTagsFor(frontmatter)
    const description = frontmatter.desc || ''

    const sameAs = [frontmatter.publication, frontmatter.github].filter(Boolean)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: frontmatter.title,
        description: description || frontmatter.title,
        url: `${SITE_URL}/${slug}`,
        ...(tags.length > 0 && { keywords: tags }),
        creator: {
            '@type': 'Organization',
            name: 'Simula Research Laboratory',
            url: 'https://www.simula.no'
        },
        ...(sameAs.length > 0 && { sameAs }),
        ...(frontmatter.mtime && { dateModified: frontmatter.mtime }),
        isAccessibleForFree: true
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Simula Datasets - {frontmatter.title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={frontmatter.title} />
                <meta property="og:description" content={description} />
                {frontmatter.thumbnail && (
                    <meta property="og:image" content={frontmatter.thumbnail} />
                )}
                <meta property="og:type" content="article" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <FiArrowLeft
                        className="mr-1 h-4 w-4"
                        aria-hidden="true"
                    />
                    Back to all datasets
                </Link>
            </nav>

            {/* Hero */}
            <header className="mx-auto mb-10 max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {frontmatter.title}
                </h1>
                {description && (
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                        {description}
                    </p>
                )}

                {tags.length > 0 && (
                    <div className="mt-5 space-y-2">
                        {FACETS.map(facet => {
                            const facetTags = frontmatter[facet.field] || []
                            if (facetTags.length === 0) return null
                            return (
                                <div
                                    key={facet.key}
                                    className="flex flex-wrap items-center gap-2"
                                >
                                    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        {facet.label}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {facetTags.map(tag => (
                                            <Link
                                                key={tag}
                                                href={{
                                                    pathname: '/',
                                                    query: { [facet.key]: tag }
                                                }}
                                                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-primary hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                {TAG_LABEL[tag] || tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    {frontmatter.publication && (
                        <a
                            href={frontmatter.publication}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <FiBookOpen
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Publication
                        </a>
                    )}
                    {frontmatter.github && (
                        <a
                            href={frontmatter.github}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <FiGithub
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            GitHub repo
                        </a>
                    )}
                    <span className="text-xs text-gray-500 sm:ml-auto">
                        Last updated {formatMonthYear(frontmatter.mtime)}
                    </span>
                </div>
            </header>

            <article className="prose prose-base mx-auto max-w-3xl sm:prose-lg prose-h2:mb-2 prose-h2:mt-8 prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h3:font-semibold prose-p:my-3 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <div
                    className="wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </article>

            {related.length > 0 && (
                <aside
                    aria-labelledby="related-heading"
                    className="mt-16 border-t border-gray-200 pt-10"
                >
                    <h2
                        id="related-heading"
                        className="mb-6 text-2xl font-semibold tracking-tight text-gray-900"
                    >
                        Related datasets
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map(d => (
                            <DatasetCard key={d.slug} dataset={d} />
                        ))}
                    </div>
                </aside>
            )}
        </div>
    )
}

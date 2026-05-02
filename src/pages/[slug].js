import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import DatasetCard from '../components/dataset-card'
import { findRelatedDatasets, timeAgo } from '../utils'

export async function getStaticPaths() {
    const files = fs.readdirSync('datasets')
    const paths = files.map(fileName => ({
        params: {
            slug: fileName.replace('.md', '')
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const filepath = `datasets/${slug}.md`
    const fileName = fs.readFileSync(filepath, 'utf-8')
    const stats = fs.statSync(filepath)
    const { data: frontmatter, content } = matter(fileName)
    frontmatter.mtime = stats.mtime.toISOString()

    // Build a list of all datasets to find related ones
    const allFiles = fs.readdirSync('datasets')
    const allDatasets = allFiles.map(name => {
        const fp = `datasets/${name}`
        const raw = fs.readFileSync(fp, 'utf-8')
        const fm = matter(raw).data
        fm.mtime = fs.statSync(fp).mtime.toISOString()
        return { slug: name.replace('.md', ''), frontmatter: fm }
    })

    const related = findRelatedDatasets(
        { slug, frontmatter },
        allDatasets,
        3
    )

    return {
        props: {
            slug,
            frontmatter,
            content,
            related
        }
    }
}

export default function DatasetPage({ slug, frontmatter, content, related }) {
    const md = markdownIt({ html: true })
    const tags = frontmatter.tags || []
    const description = frontmatter.desc || ''

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <Head>
                <title>Simula Datasets - {frontmatter.title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={frontmatter.title} />
                <meta property="og:description" content={description} />
                {frontmatter.thumbnail && (
                    <meta property="og:image" content={frontmatter.thumbnail} />
                )}
                <meta property="og:type" content="article" />
            </Head>

            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
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
                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                href={{ pathname: '/', query: { tag } }}
                                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-primary hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    {frontmatter.publication && (
                        <a
                            href={frontmatter.publication}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                                    strokeWidth="1.5"
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                            </svg>
                            Publication
                        </a>
                    )}
                    {frontmatter.github && (
                        <a
                            href={frontmatter.github}
                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                                    strokeWidth="1.5"
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                            </svg>
                            GitHub repo
                        </a>
                    )}
                    <span className="ml-auto text-xs text-gray-500">
                        Last updated {timeAgo(frontmatter.mtime)}
                    </span>
                </div>
            </header>

            <article className="prose prose-lg mx-auto max-w-3xl prose-h2:mb-2 prose-h2:mt-8 prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h3:font-semibold prose-p:my-3 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <div
                    className="wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: md.render(content) }}
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

import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'

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
    frontmatter.mtime = stats.mtime.toString()
    return {
        props: {
            frontmatter,
            content
        }
    }
}

export default function DatasetPage({ frontmatter, content }) {
    const md = markdownIt({ html: true })
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <Head>
                <title>Simula Datasets - {frontmatter.title}</title>
            </Head>

            {/* Navigation */}
            <nav className="mb-6" aria-label="Breadcrumb">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
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
                <div className="mt-1 text-sm text-gray-400">
                    <Link href="/" className="hover:text-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary">
                            Datasets
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-600">{frontmatter.title}</span>
                </div>
            </nav>

            <div className="mb-8 text-center">
                <h1 className="mb-2 text-4xl">{frontmatter.title}</h1>
                <p className="text-xl text-gray-600">{frontmatter.desc}</p>
                <div className="mx-auto mt-3 flex w-24 justify-around">
                    {frontmatter.publication && (
                        <a
                            href={frontmatter.publication}
                            aria-label="View publication"
                            title="View publication"
                            className="rounded-sm p-1 transition-colors hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
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
                    {frontmatter.github && (
                        <a
                            href={frontmatter.github}
                            aria-label="View GitHub repository"
                            title="View GitHub repository"
                            className="rounded-sm p-1 transition-colors hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
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
            </div>
            <article className="prose mx-auto max-w-none prose-h2:mb-2 prose-h2:mt-5 prose-p:my-3 prose-a:text-primary prose-a:hover:text-primary/80">
                <div className="wrap-break-word" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
            </article>
        </div>
    )
}

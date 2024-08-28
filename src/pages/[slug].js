import Head from 'next/head'
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
        <div className="mx-auto max-w-7xl px-8">
            <Head>
                <title>Simula Datasets - {frontmatter.title}</title>
            </Head>
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-4xl">{frontmatter.title}</h1>
                <h2 className="text-xl">{frontmatter.desc}</h2>
                <div className="mx-auto mt-3 flex w-24 justify-around">
                    {frontmatter.publication && (
                        <a href={frontmatter.publication}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
                        <a href={frontmatter.github}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
            <div className="prose mx-auto max-w-none prose-h2:mb-2 prose-h2:mt-5 prose-p:my-3">
                <div className="break-words" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
            </div>
        </div>
    )
}

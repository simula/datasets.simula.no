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

    return {
        props: {
            datasets
        }
    }
}

export default function Home({ datasets }) {
    const [value, setValue] = useState('')

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl">Simula Datasets</h1>
                <h2 className="text-lg">
                    A collection of datasets gathered and published by <br />
                    Simula Research Laboratory and SimulaMet.
                </h2>

                <div className="mt-4">
                    <div className="border-1 mx-auto flex h-10 w-96 items-center rounded-md border-gray-600 bg-slate-200 px-1 focus-within:outline focus-within:outline-2 focus-within:outline-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 inline-block h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="gray"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            onChange={val => setValue(val.target.value)}
                            value={value}
                            type="text"
                            placeholder="Search for datasets..."
                            className="h-8 w-64 grow border-none bg-slate-200 px-2 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto grid w-[320px] grid-cols-1 gap-4 p-4 md:w-[640px] md:grid-cols-2 md:p-0 lg:w-[960px] lg:grid-cols-3 xl:w-[1280px] xl:grid-cols-4">
                {datasets
                    .filter(props => !props.frontmatter.hidden)
                    .filter(
                        props =>
                            props.frontmatter.title
                                .toLowerCase()
                                .includes(value) ||
                            props.frontmatter.tags.includes(value)
                    )
                    .map(props => {
                        return (
                            <div
                                key={props.slug}
                                className="flex flex-col overflow-hidden rounded-md border border-gray-300 shadow-md transition duration-200 ease-in-out hover:shadow-2xl"
                            >
                                <Link href={`/${props.slug}`} passHref>
                                    <div className="flex cursor-pointer flex-col overflow-hidden">
                                        <div className="relative h-36 w-full overflow-hidden">
                                            <Image
                                                src={`${props.frontmatter.thumbnail}`}
                                                alt={props.frontmatter.title}
                                                height={144}
                                                width={308}
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="h-8">
                                            <h1 className="mt-1 px-4 pt-2 text-lg font-medium leading-tight">
                                                {props.frontmatter.title}
                                            </h1>
                                        </div>
                                        <div className="h-16 px-4 pt-2 text-sm text-slate-600 line-clamp-3">
                                            {props.frontmatter.desc}
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex w-full flex-row justify-between px-4 pb-2 pt-4">
                                    <div className="flex flex-row">
                                        {props.frontmatter.publication && (
                                            <a
                                                href={
                                                    props.frontmatter
                                                        .publication
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-4 h-5 w-5"
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
                                        {props.frontmatter.github && (
                                            <a href={props.frontmatter.github}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-4 h-5 w-5"
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
                                    <div className="flex items-end align-bottom text-xs">
                                        {timeAgo(props.frontmatter.mtime)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

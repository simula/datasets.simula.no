import { useContext, useState } from 'react'
import { SearchContext } from '../context/search'
import fs from 'fs'
import matter from 'gray-matter'
import { DatasetGrid } from '../components/grid'
import SearchAndFilter from '../components/search'

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
        <SearchContext.Provider value={{ value, setValue }}>
            <div>
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl">Simula Datasets</h1>
                    <h2 className="text-xl">
                        A collection of datasets gathered and published by{' '}
                        <br />
                        Simula Research Laboratory and SimulaMet.
                    </h2>
                    <SearchAndFilter />
                </div>
                <DatasetGrid datasets={datasets} />
            </div>
        </SearchContext.Provider>
    )
}

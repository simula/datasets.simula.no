import Card from './card'
import { useContext } from 'react'
import { SearchContext } from '../context/search'

const datasetSearchCriteria = (props, criteria) => {
    return (
        datasetTitleFilter(props.frontmatter.title, criteria) ||
        datasetTagFilter(props.frontmatter.tags, criteria)
    )
}

const datasetTagFilter = (tags, criteria) => {
    return tags.includes(criteria)
}

const datasetTitleFilter = (title, criteria) => {
    return title.toLowerCase().includes(criteria)
}

export function DatasetGrid({ datasets }) {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 md:p-0 lg:grid-cols-3 xl:grid-cols-4">
            {datasets
                .filter(props => datasetSearchCriteria(props, value))
                .map(props => {
                    return (
                        <Card
                            key={props.slug}
                            slug={props.slug}
                            title={props.frontmatter.title}
                            thumbnail={props.frontmatter.thumbnail}
                            desc={props.frontmatter.desc}
                            lastUpdated={props.frontmatter.mtime}
                            tags={props.frontmatter.tags}
                        />
                    )
                })}
        </div>
    )
}

import Link from 'next/link'
import { useContext } from 'react'
import { SearchContext } from '../context/search'

export default function Card(props) {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div
            key={props.slug}
            className="m-2 flex h-96 flex-col overflow-hidden rounded-xl border border-gray-300 shadow-lg"
        >
            <Link href={`/${props.slug}`}>
                <div className="flex cursor-pointer flex-col overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                        <img
                            alt={props.title}
                            src={`${props.thumbnail}`}
                            className="min-h-full w-full object-cover"
                        />
                    </div>
                    <div className="h-8">
                        <h1 className="mt-1 px-4 py-2 text-2xl font-medium leading-tight">
                            {props.title}
                        </h1>
                    </div>
                    <div className="h-16 p-4 text-slate-600 line-clamp-2">
                        {props.desc}
                    </div>
                    <div className="h-12 p-4 text-slate-600">
                        <span className="text-xs">
                            Updated on {props.lastUpdated}{' '}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="w-full h-12 flex flex-column flex-wrap overflow-hidden border-t-2 px-4">
                {props.tags &&
                    props.tags.map(tag => (
                        <span
                            key={tag + props.slug}
                            onClick={() => setValue(tag)}
                            className="m-1 my-2 cursor-pointer rounded-lg bg-gray-200 p-2 text-xs font-semibold hover:bg-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
            </div>
        </div>
    )
}

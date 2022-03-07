import { useContext } from 'react'
import { SearchContext } from '../context/search'

export default function SearchAndFilter() {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div className="mt-6">
            <div className="border-1 mx-auto flex h-10 w-96 px-1 items-center rounded-xl border-gray-600 bg-slate-200 focus-within:outline focus-within:outline-2 focus-within:outline-black">
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
                    className="h-8 w-64 grow border-none bg-slate-200 px-2 focus:outline-none"
                />
            </div>
        </div>
    )
}

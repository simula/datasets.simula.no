import Link from 'next/link'

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="mb-8 bg-primary">
                <nav className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    <div>
                        <Link href="/">
                            <img
                                src="/logo.svg"
                                height={70}
                                width={70}
                                className="cursor-pointer py-6"
                            />
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto max-w-7xl flex-1">
                {children}
            </main>
            <footer className="mt-8 bg-primary py-4"></footer>
        </div>
    )
}

import Link from 'next/link'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-primary"
            >
                Skip to main content
            </a>
            <header className="bg-primary">
                <nav className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    <Link href="/">
                        <Image
                            alt="logo"
                            src="/logo.svg"
                            height={70}
                            width={70}
                            className="cursor-pointer py-6"
                        />
                    </Link>
                </nav>
            </header>
            <main id="main-content" className="flex-1 bg-white py-10">{children}</main>
            <footer className="flex justify-center bg-primary py-4">
                <a
                    href="https://github.com/simula/datasets.simula.no"
                    aria-label="View source code on GitHub"
                    className="text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                    <FaGithub size="1.5rem" />
                </a>
            </footer>
        </div>
    )
}

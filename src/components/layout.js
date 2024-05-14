import Link from 'next/link'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-primary">
                <nav className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    <Link href="/" passHref>
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
            <main className="flex-1 bg-white py-10">{children}</main>
            <footer className="flex justify-center bg-primary py-4">
                <a href="https://github.com/simula/datasets.simula.no">
                    <FaGithub size="1.5rem" />
                </a>
            </footer>
        </div>
    )
}

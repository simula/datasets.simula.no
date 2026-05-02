import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import '../styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

function MyApp({ Component, pageProps }) {
    return (
        <div className={`${inter.variable} font-sans`}>
            <Layout>
                <Head>
                    <title>Simula Datasets</title>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </div>
    )
}

export default MyApp

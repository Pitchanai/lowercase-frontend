import '../styles/globals.css'
import Head from 'next/head'
import ReactGA from 'react-ga'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

function MyApp({ Component, pageProps }) {
  const [isGAInitialized, setIsGAInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    ReactGA.initialize('G-P91F6GXC8D')
    ReactGA.pageview(window.location.pathname + window.location.search)
    setIsGAInitialized(true)
  }, [])

  useEffect(() => {
    if (!isGAInitialized) return
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [router.pathname])
  return (
    <>
      <Head>
        <title>lowercase</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://lowercase.lol" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="lowercase" />
        <meta
          property="og:description"
          content="The most powerful lowercase tool"
        />
        <meta
          property="og:image"
          content="https://lowercase.lol/lowercase.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="lowercase" />
        <meta
          name="twitter:description"
          content="The most powerful lowercase tool"
        />
        <meta
          name="twitter:image"
          content="https://lowercase.lol/lowercase.png"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <Component sx={{ height: '100%' }} {...pageProps} />
    </>
  )
}

export default MyApp

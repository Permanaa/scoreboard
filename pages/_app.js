import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Scoreboard</title>
        <meta name="description" content="Scoreboard" />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

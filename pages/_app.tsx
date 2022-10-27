import '../src/styles/globals.css'
import '@originprotocol/origin-storybook/lib/styles.css'
import type { AppProps, AppContext } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

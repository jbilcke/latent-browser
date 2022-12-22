import type { AppProps } from 'next/app'

import '../style.css'
import { usePreventFastRefreshDev } from '../utils/usePreventPageRefresh'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  // we need this right now because of an access control issue between the hot reloader <-> webkit :/
  usePreventFastRefreshDev()

  return <Component {...pageProps} />
}

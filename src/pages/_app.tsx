import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const lang = url.split('/')[1]
      if (['en', 'es', 'fr'].includes(lang)) {
        document.documentElement.lang = lang
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)


import '../styles/globals.css'
import { withTRPC } from '@trpc/next'
import { AppRouter } from 'server/routers'
import superjson from 'superjson'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      return {
        transformer: superjson,
        url: '/api/trpc'
      }
    }
    const ONE_DAY_SECONDS = 60 * 60 * 24
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    )

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      transformer: superjson,
      url,
      headers: {
        'x-ssr': '1'
      }
    }
  },
  ssr: true
})(MyApp)

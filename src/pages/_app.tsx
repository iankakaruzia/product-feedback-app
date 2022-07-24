import '../styles/globals.css'
import { withTRPC } from '@trpc/next'
import { AppRouter } from 'server/routers'
import superjson from 'superjson'
import type { AppProps } from 'next/app'
import NextProgress from 'nextjs-progressbar'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NextProgress
        color='#AD1FEA'
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <Toaster position='top-right' />
      <Head>
        <title>Product Feedback</title>
        <link
          rel='shortcut icon'
          href='/assets/favicon-32x32.png'
          type='image/png'
        />
        <meta
          name='description'
          content='Send us your feedback about our product'
        />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
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

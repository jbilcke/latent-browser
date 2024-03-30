import Head from 'next/head'

import { cn } from '../utils/cn'

import '../style.css'

export const metadata = {
  title: 'The Latent Browser - since 2022',
  description: 'The Latent Browser - since 2022',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <body className={cn(
        // `h-full w-full overflow-auto`,
        // `dark text-neutral-100 bg-neutral-950`,
        // roboto.className
        )}>{children}</body>
    </html>
  )
}

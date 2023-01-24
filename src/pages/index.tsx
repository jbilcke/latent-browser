import Head from 'next/head'

function Index() {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <div className="rounded-xl overflow-hidden select-none">
        <iframe
          id="iframe"
          className="absolute w-screen h-screen border-none"
          src="https://www.latent.store/browser"
        />
      </div>
    </>
  )
}

export default Index

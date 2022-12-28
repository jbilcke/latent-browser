import { useCallback, useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

import { imagineHTML } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import { webApp, webComponent } from '../engine/prompts/content'
import { emitToParent } from '../utils/event'
import { useParam } from '../utils/useParam'

function Content() {
  const tab = useParam('tab')
  const prompt = useParam('prompt')
  const [html, setHtml] = useState('<div></div>')

  useEffect(() => {
    console.log('html changed!', html)

    const onRenderer = (e: CustomEvent<{ name: string; html: string }>) => {
      console.log('received a message from host:', e.detail)
      // if (e.detail.name === '....') {
      // }
    }

    window.document.addEventListener('host', onRenderer, false)

    if (html) {
      // emitToParent('afterRender', { html })
      ;(async () => {
        await resolveImages()

        // emitToParent('afterImages', { html })
      })()
    }

    return () => {
      window.document.removeEventListener('host', onRenderer)
    }
  }, [html])

  const loadPrompt = async (prompt?: string) => {
    if (!prompt?.length) {
      return
    }
    window['app'] = {}

    window['queryOpenAI'] = async (query: string) =>
      imagineHTML(webComponent('lambda', query))

    emitToParent('beforeQueryModel', { tab })

    let best = ''

    try {
      best = await imagineHTML(webApp(prompt))
    } catch (exc) {
      console.error(exc)

      emitToParent('failedQueryModel', { tab })
      return
    }

    emitToParent('afterQueryModel', { tab })

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }
    // replaceImages()

    console.log('loading html:', best)
    // setIsLoading(false)

    emitToParent('beforeRender', { tab })

    setHtml(best)
  }

  useEffect(() => {
    loadPrompt(prompt)
  }, [prompt])

  return (
    <>
      {/* yeah, well, this doesn't work 
      <Head>
        <Script src="https://code.jquery.com/jquery-3.6.1.min.js" />
        <Script src="https://unpkg.com/tone@14.7.77/build/Tone.js" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.147.0/three.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      */}
      {/* TODO import this in another way? */}
      <script src="https://code.jquery.com/jquery-3.6.1.min.js" />

      {/* should be a prompt instruction like "you can import it from https://unpkg.com/tone.js" or something */}
      <script src="https://unpkg.com/tone@14.7.77/build/Tone.js" />
      <script
        src={
          // unfortunately the latest version of three.js >= r125 introduced a breaking change, which break a lot of things
          // 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.147.0/three.min.js'
          'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.js'
        }
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <InnerHTML
        className="pt-20 flex w-full items-center flex-col"
        html={html}
      />
    </>
  )
}

export default Content

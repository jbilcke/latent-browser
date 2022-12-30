import { useCallback, useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

import { imagineHTML } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import { webApp, webComponent } from '../engine/prompts/content'
import { emitToParent } from '../utils/event'
import { useParam } from '../utils/useParam'
import { ModelProgressBar } from '../components/loaders/ModelProgressBar'
import useInterval from '../utils/useInterval'

function Content() {
  const tab = useParam('tab')
  const prompt = useParam('prompt')
  const [html, setHtml] = useState('<div></div>')

  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const model = 'text-davinci-003'
  const estimatedTimeSec = 50

  useEffect(() => {
    console.log('html changed!', html)

    const onRenderer = (e: CustomEvent<{ name: string; html: string }>) => {
      console.log('received a message from host:', e.detail)
      // if (e.detail.name === '....') {
      // }
    }

    window.document.addEventListener('host', onRenderer, false)

    if (html) {
      // emitToParent('afterRender', { html, tab })
      ;(async () => {
        await resolveImages()

        // emitToParent('afterImages', { html, tab })
      })()
    }

    return () => {
      window.document.removeEventListener('host', onRenderer)
    }
  }, [html])

  const loadPrompt = async (prompt = '') => {
    prompt = prompt.trim()
    if (!prompt.length) {
      return
    }

    window['app'] = {}

    window['queryOpenAI'] = async (query = '') => {
      query = query.trim()
      if (!query.length) {
        return
      }
      imagineHTML(webComponent('lambda', query), model)
    }

    setIsLoading(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)

    emitToParent('beforeQueryModel', { tab })

    let best = ''

    try {
      best = await imagineHTML(webApp(prompt), model)
    } catch (exc) {
      console.error(exc)

      emitToParent('failedQueryModel', { tab })
      setIsLoading(false)
      return
    }

    emitToParent('afterQueryModel', { tab })

    if (!best) {
      console.log('did not get enough results, aborting')
      setIsLoading(false)
      return
    }
    // replaceImages()

    console.log('loading html:', best)
    // setIsLoading(false)

    emitToParent('beforeRender', { tab })
    setHtml(best)
    setIsLoading(false)
  }

  useEffect(() => {
    loadPrompt(prompt)
  }, [prompt])

  useInterval(
    () => {
      setElapsedTimeMs(new Date().valueOf() - startTimestamp)
    },
    // Delay in milliseconds or null to stop it
    isLoading ? 250 : null
  )

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
      <ModelProgressBar
        elapsedTimeMs={elapsedTimeMs}
        estimatedTimeSec={estimatedTimeSec}
        isLoading={isLoading}
        model={model}
        provider="OpenAI"
      />
    </>
  )
}

export default Content

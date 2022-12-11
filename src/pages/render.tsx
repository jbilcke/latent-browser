import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { queryModel } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import { webApp, webComponent } from '../engine/prompts'
import Head from 'next/head'
import Script from 'next/script'

import { downloadHtmlFile } from '../engine/exporters/html'

const getPrompt = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('prompt')
}

function Render() {
  const [prompt, setPrompt] = useState('')
  const [html, setHtml] = useState('<div></div>')
  const [eta, setETA] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function loadPrompt() {
    if (!prompt.length) {
      return
    }

    // setIsLoading(true)
    // setETA(35)

    new CustomEvent('renderer', {
      detail: {
        name: 'beforeQueryModel',
        prompt,
      },
    })

    let best = ''

    try {
      best = await queryModel(webApp(prompt))
    } catch (exc) {
      console.error(exc)

      new CustomEvent('renderer', {
        detail: {
          name: 'failedQueryModel',
        },
      })
      return
    }

    new CustomEvent('renderer', {
      detail: {
        name: 'afterQueryModel',
        best,
      },
    })

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }
    // replaceImages()

    console.log('loading html:', html)
    // setIsLoading(false)

    window.parent.document.dispatchEvent(
      new CustomEvent('renderer', {
        detail: {
          name: 'beforeRender',
          html,
        },
      })
    )
    setHtml(best)
  }

  useEffect(() => {
    console.log('html changed!', html)

    const onRenderer = (e: CustomEvent<{ name: string; html: string }>) => {
      console.log('received a message from host:', e.detail)
      // if (e.detail.name === '....') {
      // }
    }

    window.document.addEventListener('host', onRenderer, false)

    if (html) {
      new CustomEvent('renderer', {
        detail: {
          name: 'afterRender',
          html,
        },
      })
      ;(async () => {
        await resolveImages()

        new CustomEvent('renderer', {
          detail: {
            name: 'afterImages',
            html,
          },
        })
      })()
    }

    return () => {
      window.document.removeEventListener('host', onRenderer)
    }
  }, [html])

  useEffect(() => {
    loadPrompt()
  }, [prompt])

  useEffect(() => {
    // repair the context in case the AI overwrote it
    window['app'] = {}

    window['queryOpenAI'] = async (query: string) =>
      queryModel(webComponent('lambda', query))

    const params = new URLSearchParams(window.location.search)

    setPrompt(params.get('prompt').trim())
  }, [])

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

export default Render

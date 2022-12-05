import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { queryModel } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import { mainTemplate, subTemplate } from '../engine/prompts'

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

    const best = await queryModel(mainTemplate(prompt))

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }
    // replaceImages()

    console.log('loading html:', html)
    // setIsLoading(false)
    setHtml(best)
  }

  useEffect(() => {
    resolveImages()
  }, [html])

  useEffect(() => {
    loadPrompt()
  }, [prompt])

  useEffect(() => {
    // repair the function in case the AI overwrote it
    window['queryOpenAI'] = async (query: string) =>
      queryModel(subTemplate(query))

    const params = new URLSearchParams(window.location.search)
    setPrompt(params.get('prompt').trim())
  }, [])

  /*
  this is to display a spinner, but unfortunately if I re-render the HTML like this, it will restart the <script>
  I should maybe first extract the code and execute it in eval after first layout, I don't know
        {isLoading || !html ? (
        eta ? (
          <div className="flex w-screen h-screen items-center justify-center">
            <CountdownCircleTimer
              isPlaying
              duration={eta}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <InnerHTML
          id="sandbox"
          className="pt-20 flex w-full items-center flex-col"
          html={html}
        />
      )}
      */
  return (
    <>
      {/* TODO import this in another way? */}
      <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
      {/* should be a prompt instruction like "you can import it from https://unpkg.com/tone.js" or something */}
      <script src="https://unpkg.com/tone@14.7.77/build/Tone.js"></script>
      <InnerHTML
        id="sandbox"
        className="pt-20 flex w-full items-center flex-col"
        html={html}
      />
    </>
  )
}

export default Render

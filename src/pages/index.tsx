import { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { downloadHtmlFile } from '../engine/exporters/html'

function App() {
  const ref = useRef<HTMLIFrameElement>()
  const [prompt, setPrompt] = useState('')
  const [html, setHtml] = useState('')
  const [query, setQuery] = useState('')
  const [duration, setDuration] = useState(0)
  const [src, setSrc] = useState(`/search?prompt=`)

  const onExport = () => {
    console.log('html to download:', html)
    downloadHtmlFile(html)
  }

  useEffect(() => {
    const onRenderer = ({
      detail: msg,
    }: CustomEvent<{
      name: string
      html?: string
      results?: string
      prompt?: string
    }>) => {
      console.log('received a message from renderer:', msg)
      if (msg.name === 'failedQueryModel') {
        /*
        {
          "error": {
            "message": "That model is currently overloaded with other requests. You can retry your request, or contact us through our help center at help.openai.com if the error persists. (Please include the request ID 6878761e3c8efc809980dd857955cbc0 in your message.)",
            "type": "server_error",
            "param": null,
            "code": null
          }
        }
        */
        setHtml('<p>OpenAI failure (503 error)</p>')
        setDuration(0)
      } else if (msg.name === 'beforeRender') {
        console.log('setting html to:', msg.html)
        if (msg.html) {
          setHtml(msg.html)
        }
        setDuration(0)
      } else if (msg.results) {
        setDuration(0)
      } else if (msg.name === 'open' && msg.prompt) {
        setDuration(50)
        // setQuery(msg.prompt)
        // setPrompt(msg.prompt)
        setSrc(`/content?prompt=${encodeURIComponent(msg.prompt)}`)
      }
    }

    window.document.addEventListener('renderer', onRenderer, false)

    return () => {
      window.document.removeEventListener('renderer', onRenderer)
    }
  }, [])

  return (
    <div>
      <iframe
        ref={ref}
        className="absolute w-screen h-screen shadow-google"
        src={src}
      />
      {duration && (
        <div className="flex w-screen h-screen items-center justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-16 z-10 bg-white bg-opacity-20 backdrop-blur-lg py-2 shadow-combo">
        <div className="flex items-center justify-center space-x-4 w-full px-16">
          <input
            className="font-mono grow text-xs py-2 px-4 rounded-full bg-white/40 hover:bg-white/70"
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="Cookie recipes, with 3 photos of delicious cookies.."
            // value={query}
          />
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={() => {
              setDuration(30)
              setPrompt(query)
              setSrc(`/search?prompt=${encodeURIComponent(query)}`)
            }}
          >
            {/* or: Dream 🔮, Explore, Generate 🎲, Randomize 🎲, Imagine 🔮, Realize, See, Wonder */}
            Search 🔮
          </button>
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={() => {
              setDuration(50)
              setPrompt(query)
              setSrc(`/content?prompt=${encodeURIComponent(query)}`)
            }}
          >
            {/* or: Dream 🔮, Generate 🎲, Randomize 🎲, Imagine 🔮, Realize, See, Wonder */}
            Generate 🎲
          </button>
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={onExport}
          >
            {/* or: Save, Keep, Export, Pick, Preserve */}
            Save 🍒
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

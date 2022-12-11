import { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { downloadHtmlFile } from '../engine/exporters/html'

function App() {
  const ref = useRef<HTMLIFrameElement>()
  const [prompt, setPrompt] = useState('')
  const [html, setHtml] = useState('')
  const [query, setQuery] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onGenerate = () => {
    setLoading(true)
    setPrompt('')
    setTimeout(() => {
      setPrompt(query)
    }, 100)
  }

  const onExport = async () => {
    /*
    ref.current.contentDocument.dispatchEvent(
      new CustomEvent('host', {
        detail: {
          name: 'export',
        },
      })
    )*/
    downloadHtmlFile(html)
  }

  const onExplore = () => {
    // TODO
  }

  useEffect(() => {
    const onRenderer = (e: CustomEvent<{ name: string; html: string }>) => {
      console.log('received a message from renderer:', e.detail)
      if (e.detail.html) {
        setHtml(e.detail.html)
        setLoading(false)
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
        className="absolute w-screen h-screen"
        src={`/render?prompt=${encodeURIComponent(prompt)}`}
      />

      {isLoading && (
        <div className="flex w-screen h-screen items-center justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={35}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-16 z-10 bg-white bg-opacity-20 backdrop-blur-lg border-gray-300 hover:border-gray-400 border-b-2 py-2">
        <div className="flex items-center justify-center space-x-4 w-full px-16">
          <input
            className="font-mono grow text-xs py-2 px-4 rounded-full bg-white/40 hover:bg-white/70"
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="Cookie recipes, with 3 photos of delicious cookies.."
          />
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={onGenerate}
          >
            {/* or: Dream 🔮, Generate 🎲, Randomize 🎲, Imagine 🔮, Realize, See, Wonder */}
            Generate 🔮
          </button>
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={onExport}
          >
            {/* or: Save, Keep, Export, Pick, Preserve */}
            Pick 🍒
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [query, setQuery] = useState('')

  const onClick = () => {
    setPrompt('')
    setTimeout(() => {
      setPrompt(query)
    }, 100)
  }

  return (
    <div>
      <iframe
        className="absolute w-screen h-screen"
        src={`/render?prompt=${encodeURIComponent(prompt)}`}
      />
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-16 z-10 bg-white bg-opacity-20 backdrop-blur-lg border-gray-300 hover:border-gray-400 border-b-2 py-2">
        <div className="flex items-center justify-center space-x-4 w-full px-16">
          <input
            className="font-mono grow text-xs py-2 px-4 rounded-full bg-white/40 hover:bg-white/70"
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="How to make a cookie.."
          />
          <button
            type="button"
            className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={onClick}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

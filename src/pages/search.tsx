import { useEffect, useState } from 'react'
import { useParam } from '../utils/useParam'
import { emitToParent } from '../utils/event'
import { imagineJSON } from '../providers/openai'
import { searchTemplate } from '../engine/prompts/search'

interface Result {
  title: string
  subtitle: string
  description: string
}

// a search result page in the style of a famous search engine =)
function Results() {
  const prompt = useParam('prompt')
  const [results, setResults] = useState<Result[]>([])
  const [runTime, setRunTime] = useState<number>(0)

  const loadPrompt = async (prompt: string) => {
    if (!prompt?.length) {
      return
    }

    console.log('searching..')
    const startedAt = new Date().valueOf()

    emitToParent('beforeQueryModel')

    let best: Result[] = []

    try {
      best = await imagineJSON(searchTemplate(prompt, 10), [])
    } catch (exc) {
      console.error(exc)

      emitToParent('failedQueryModel')
      return
    }

    emitToParent('afterQueryModel', { best })

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }

    console.log('loading results:', best)

    emitToParent('beforeRender', { results: best })

    setResults(best)

    const endedAt = new Date().valueOf()

    setRunTime(endedAt - startedAt)
  }

  useEffect(() => {
    loadPrompt(prompt)
  }, [prompt])

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <div className="font-google bg-light-bg w-full flex flex-col pt-16 pl-8">
      {!!results.length && (
        <div className="flex flex-col w-[652px]">
          <div className="flex items-center text-light-secondary h-11 my-2">
            Showing {results.length} first results (of infinity)
          </div>
          <div className="flex flex-col space-y-8">
            {results.map(({ title, subtitle, description }) => (
              <div key={title} className="flex flex-col">
                <div className="text-sm text-light-secondary">{subtitle}</div>

                <div className="text-xl text-light-highlight">
                  <a
                    className="cursor-pointer hover:underline decoration-2"
                    href="#"
                    onClick={() => {
                      emitToParent('open', { prompt: description })
                    }}
                  >
                    {title}
                  </a>
                </div>
                <div className="text-sm text-light-primary leading-[1.58]">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Results

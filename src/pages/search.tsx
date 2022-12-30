import { useEffect, useState } from 'react'
import { useParam } from '../utils/useParam'
import { emitToParent } from '../utils/event'
import { imagineJSON } from '../providers/openai'
import { searchTemplate } from '../engine/prompts/search'
import { ModelProgressBar } from '../components/loaders/ModelProgressBar'
import useInterval from '../utils/useInterval'

interface Result {
  title: string
  subtitle: string
  description: string
}

const cleanWord = (word) => word.trim().toLocaleLowerCase().replace('.', '')

// a search result page in the style of a famous search engine =)
function Results() {
  const tab = useParam('tab')
  const prompt = useParam('prompt')
  const [results, setResults] = useState<Result[]>([])
  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0)
  const [finalTimeMs, setFinalTimeMs] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const model = 'text-davinci-003'
  const nbResults = 8
  const estimatedTimeSec = nbResults * 4

  const loadPrompt = async (prompt = '') => {
    prompt = prompt.trim()
    if (!prompt.length) {
      return
    }

    console.log('searching..')
    const startedAt = new Date().valueOf()
    setIsLoading(true)
    setStartTimestamp(startedAt)
    setElapsedTimeMs(0)
    setFinalTimeMs(0)

    emitToParent('beforeQueryModel', { tab })

    let best: Result[] = []

    try {
      best = await imagineJSON(searchTemplate(prompt, nbResults), [], model)
    } catch (exc) {
      console.error(exc)

      emitToParent('failedQueryModel', { tab })
      setIsLoading(false)
      return
    }

    emitToParent('afterQueryModel', { tab, best })

    if (!best) {
      console.log('did not get enough results, aborting')
      setIsLoading(false)

      return
    }

    console.log('loading results:', best)

    emitToParent('beforeRender', { tab, results: best })

    setResults(best)

    // compute the precise final time
    setFinalTimeMs(new Date().valueOf() - startedAt)
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
    isLoading ? 200 : null
  )

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <div className="font-google bg-light-bg w-full flex flex-col pt-4 pb-4 pl-8">
      {!!results.length && (
        <div className="flex flex-col w-[652px]">
          <div className="flex items-center text-light-secondary h-11 my-2">
            About {results.length} results ({(finalTimeMs / 1000).toFixed(2)}{' '}
            sec)
          </div>
          <div className="flex flex-col space-y-8">
            {results.map(({ title, subtitle, description }) => (
              <div
                key={title.concat(subtitle).concat(description)}
                className="flex flex-col"
              >
                <div className="text-sm text-light-secondary">{subtitle}</div>

                <div className="text-xl text-light-highlight">
                  <a
                    className="cursor-pointer hover:underline decoration-2"
                    href="#"
                    onClick={() => {
                      emitToParent('open', {
                        title,
                        subtitle,
                        prompt: description,
                      })
                    }}
                  >
                    {title}
                  </a>
                </div>
                <div className="text-sm text-light-primary leading-[1.58]">
                  {
                    description
                    /*
                  .split(' ').map((word, i) =>
                    prompt.toLocaleLowerCase().includes(cleanWord(word)) &&
                    // todo: allow length < 2 if it is immediately before or after a longer word
                    cleanWord(word).length > 2 ? (
                      <div className="mr-1 font-bold" key={i}>
                        {word}
                      </div>
                    ) : (
                      <div className="mr-1" key={i}>
                        {word}
                      </div>
                    )
                  )*/
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ModelProgressBar
        elapsedTimeMs={elapsedTimeMs}
        estimatedTimeSec={estimatedTimeSec}
        isLoading={isLoading}
        model={model}
        provider="OpenAI"
      />
    </div>
  )
}

export default Results

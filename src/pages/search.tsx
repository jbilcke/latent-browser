import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParam } from '../hooks/useParam'
import { emitToParent } from '../utils/event'
import { imagineJSON } from '../providers/openai'
import { searchTemplate } from '../engine/prompts/search'
import { ModelProgressBar } from '../components/loaders/ModelProgressBar'
import { useInterval } from '../hooks/useInterval'
import { BigSearchInput } from '../components/inputs/BigSearchInput'
import { App } from '../types'

interface Result {
  title: string
  subtitle: string
  description: string
}

const cleanWord = (word) => word.trim().toLocaleLowerCase().replace('.', '')

// a search result page in the style of a famous search engine =)
function Search() {
  const initialApp = useParam<App>('app', {
    id: uuidv4(),
    type: 'search',
    title: '☊ Latent Search',
    subtitle: '',
    prompt: '',
    tasks: {},
    html: '',
    script: '',
    data: {},
  })
  const initialPrompt = initialApp.prompt
  const [prompt, setPrompt] = useState<string>(initialPrompt)
  const [results, setResults] = useState<Result[]>([])
  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0)
  const [finalTimeMs, setFinalTimeMs] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pass, setPass] = useState<number>(1)

  const model = 'text-davinci-003'
  const nbResults = 4
  const estimatedTimeSec = nbResults * 4
  const maxNbPasses = 2

  const generateSearchResults = async (pass, prompt = '') => {
    prompt = prompt.trim()
    if (!prompt.length || pass > maxNbPasses) {
      return
    }

    console.log('searching..')
    const startedAt = new Date().valueOf()
    setIsLoading(true)
    setStartTimestamp(startedAt)
    setElapsedTimeMs(0)
    if (pass === 1) {
      setFinalTimeMs(0)
      setResults([])
    }

    let newResults: Result[] = []

    try {
      newResults = await imagineJSON<Result[]>(
        searchTemplate(prompt, nbResults),
        [],
        '[',
        model
      )
    } catch (exc) {
      console.error(exc)
      setIsLoading(false)
      setResults([])
      return
    }

    if (!newResults) {
      console.log('did not get enough results, aborting')
      setIsLoading(false)
      setResults([])
      return
    }

    // compute the precise final time
    setFinalTimeMs(new Date().valueOf() - startedAt)
    setIsLoading(false)
    console.log('adding search results:', newResults)
    setResults((results) => results.concat(newResults))

    if (pass < maxNbPasses) {
      setPass(pass + 1)
    }
  }

  useEffect(() => {
    generateSearchResults(pass, prompt)
  }, [pass, prompt])

  useInterval(
    () => {
      setElapsedTimeMs(new Date().valueOf() - startTimestamp)
    },
    // Delay in milliseconds or null to stop it
    isLoading ? 200 : null
  )

  useEffect(() => {
    setPrompt(initialPrompt)
  }, [initialPrompt])

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <>
      {results.length ? (
        <div className="font-google bg-light-bg w-full flex flex-col pt-4 pb-4 pl-8">
          <div className="flex flex-col w-[652px]">
            <div className="flex items-center text-light-secondary h-11 my-2">
              About {results.length} results ({(finalTimeMs / 1000).toFixed(2)}{' '}
              sec
              {pass < maxNbPasses || finalTimeMs === 0
                ? ', loading more results..'
                : ''}
              )
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
                          link: {
                            title,
                            alt: description,
                          },
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
        </div>
      ) : (
        <div className="flex flex-row items-center w-screen h-screen">
          <div className="flex flex-col w-full items-center">
            <div className="font-google text-[50px] mb-6 text-gray-600">
              <span className="text-[57px] text-gray-800"> ☊ </span>
              <span className=" text-gray-800"> Latent.</span>
              <span>search</span>
            </div>
            <div className="flex w-1/2 max-w-2xl">
              <BigSearchInput
                onSubmit={(value) => {
                  setPrompt(value)
                }}
                placeholder="Search the latent web.."
              ></BigSearchInput>
            </div>
          </div>
        </div>
      )}
      <ModelProgressBar
        elapsedTimeMs={elapsedTimeMs}
        estimatedTimeSec={estimatedTimeSec}
        isLoading={isLoading}
        model={model}
        provider="OpenAI"
        stage={`JSON ${pass}/${maxNbPasses}`}
      />
    </>
  )
}

export default Search

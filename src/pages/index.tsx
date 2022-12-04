import { useEffect, useRef, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai'
import { openAIApiToken, openAIModel, openAIUser } from '../config'
import { getImage } from '../providers/replicate/imagine'
import spinner from '../assets/spinner.gif'

export const configuration = new Configuration({ apiKey: openAIApiToken })
export const openai = new OpenAIApi(configuration)

const htmlRules = `
- At the end of this message, you will need to generate an application (html + javascript) to solve a specific question or problem, and your reply will have to be given as HTML content (with a root <div>).
- This HTML will be embedded in a webpage featuring Tailwind, so you absolutely must use Tailwind classes for the design.
- You can use jquery
- The colors should match stereotypical colors associated with those words (eg nature is green, water is blue etc)
- You can choose text and background color matching the theme (be creative, as long as it follows Tailwind design rules and color schemes).
- HTML content should be nice and centered, and feature paragraph, text in bold etc.. as you see fit.
- always use Tailwind CSS classes for styling elements (including <p>, <ul> and <li> elements)
- to make the page more friendly, to do not hesitate to use emojis like if they were icons
- Your div must be centered using Tailwind classes for flexbox. Please use multiple columns, or vertically stacked content, as people don't like to scroll horizontally
- don't forget to add some padding and shadows, as well as round corners (using Tailwind utility classes)
- please use a modern design with round corners, shadows etc
- do not write things like "by [You Name]", instead write "by Brainy"
- you know how to add complex Tailwind components, like toolbars, application and grid layout, so use them if necessary
- you can generate images too! no need to write the "src" attribute, just write the "alt" in natural language like for StableDiffusion prompts, eg. <img alt="picture of a mountain with snow, high defintion, trending on art station" /> or <img alt="professional illustration of a chef kitchen, modern, high quality" />
`

// the root <div> should take the full screen width and height (using 100vw and 100vh).
const mainTemplate = (query: string) =>
  `${htmlRules}
- if the user ask for a "generator" or an "app", or "application", it means you should create an interactive page, add buttons that can trigger JS code
- if you add buttons to the page, don't forget to include the <script> necessary to run them
- Repeat: do not forget to put some javascript logic in the <script> tag and bind your buttons, to do meaningful actions!
- you should store information about app or game state in an a global javascript object (attached to the window object for instance)
- you can use the canvas to draw, and user events (keyboard, mouse) to create an interactive experience
- if you need to generate complex html content, you can call \`window.queryOpenAI()\`, an existing asyncronous function to interrogate OpenAI (you can write prompt instructions in it, in natural language): \`await window.queryOpenAI('.. some GPT-3 prompt to generate something..')\`
- after resolving the async Promise, you should inject the raw output from this function somewhere in your own div (eg using innerHTML)

The question and theme: ${query}

Your HTML response: `

const queryGPT3 = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: openAIModel,
    prompt,
    user: openAIUser,
    temperature: 0.7,
    max_tokens: 2500,
    top_p: 1,
    // best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: [stop],
  })
  const res = response?.data?.choices?.[0]?.text?.trim() || ''

  // we don't care about hallucinated image src
  const html = res.replace(/src="[^"]+/g, 'src="')

  console.log(html)

  return html
}

// sub template shuld be pretty basic, ie just "content"
const subTemplate = (query: string) =>
  `${htmlRules}

The question and theme: ${query}

IMPORTANT: don't forget to generate valid javascript code instructions in a <script> tag to handle the app logic!
And PLEASE don't write comments like "// your code goes here", instead write the actual code!

Your HTML response: `

const queryOpenAI = async (query: string) => {
  const prompt = subTemplate(query)
  const best = await queryGPT3(prompt)
  return best
}

if (typeof window !== 'undefined') {
  window['queryOpenAI'] = queryOpenAI
}

/*
let loopStarted = false
async function replaceImages() {
  if (loopStarted) {
    return
  }
  loopStarted = true
  const images = document.getElementsByTagName('img')

  for (let i = 0; i < images.length; i++) {
    // get image src
    const src = images[i].src
    const alt = images[i].alt
    console.log('found image:', { alt, src })
    if ((!src || src === 'http://localhost:1420/') && alt) {
      console.log('found image prompt:', alt)
      images[i].src = spinner.src
      // images[i].width = 300
      // images[i].height = 300
      images[i].src = await getImage(alt)
    }
  }

  setTimeout(() => {
    replaceImages()
  }, 1000)
}

if (typeof window !== 'undefined') {
  replaceImages()
}
*/

function App() {
  const [html, setHtml] = useState('<div></div>')
  const [query, setQuery] = useState('')
  const [exploring, setExploring] = useState(false)

  async function explore() {
    setHtml('<div></div>')
    setExploring(true)
    const prompt = mainTemplate(query)

    const best = await queryGPT3(prompt)

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }
    // replaceImages()

    setHtml(best)
    setExploring(false)
  }

  async function replaceImages() {
    // if (loopStarted) {
    //   return
    // }
    // loopStarted = true
    const images = document.getElementsByTagName('img')

    for (let i = 0; i < images.length; i++) {
      // get image src
      const src = images[i].src
      const alt = images[i].alt
      console.log('found image:', { alt, src })
      if (alt) {
        console.log('found image prompt:', alt)
        images[i].src = spinner.src
        // images[i].width = 300
        // images[i].height = 300
        images[i].src = await getImage(alt)
      }
    }

    // setTimeout(() => {
    //   replaceImages()
    // }, 1000)
  }

  useEffect(() => {
    replaceImages()
  }, [html])

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        explore()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div>
      {/* TODO import this in another way? */}
      <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
      <div className="flex flex-col w-screen mb-4 items-center justify-center">
        <div className="flex items-center justify-center space-x-4 w-full px-16 border-gray-300 hover:border-gray-400 border-b-2 py-4">
          <input
            className="font-mono grow text-xs"
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="How to make a cookie.."
          />
          <button
            type="button"
            className="flex-none bg-gray-500 hover:bg-gray-700 rounded-full px-4 py-2 shadow-lg font-mono text-xs font-normal text-white"
            onClick={() => explore()}
          >
            {exploring ? 'Exploring..' : 'Explore'}
          </button>
        </div>
      </div>
      <InnerHTML
        id="sandbox"
        className="flex w-full items-center flex-col"
        html={html}
      />
    </div>
  )
}

export default App

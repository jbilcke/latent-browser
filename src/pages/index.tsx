import { useEffect, useRef, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai'
import { openAIApiToken, openAIModel, openAIUser } from '../config'
import { getImage } from '../providers/replicate/imagine'
import spinner from '../assets/spinner.gif'

export const configuration = new Configuration({ apiKey: openAIApiToken })
export const openai = new OpenAIApi(configuration)

const htmlRules = `
- At the end of this message, you will need to answer a question of a specific theme, and your reply will have to be given as HTML content (with a root <div>).
- This HTML will be embedded in a webpage featuring Tailwind, so you absolutely must use Tailwind classes for the design.
- HTML content should be nice and centered, and feature paragraph, text in bold etc.. as you see fit.
- always use Tailwind CSS classes for styling elements (including <p>, <ul> and <li> elements)
- to make the page more friendly, to do not hesitate to use emojis like if they were icons
- Your div must be centered using Tailwind classes for flexbox. Please use multiple columns, or vertical column whenever possible.
- don't forget to add some padding and shadows, as well as round corners (using Tailwind utility classes)
- You can choose text and background color matching the theme (be creative, as long as it follows Tailwind design rules and color schemes).
- do not write things like "by [You Name]", instead write "by Brainy"
- you know how to add complex Tailwind components, like toolbars, application and grid layout, so use them if necessary
- please use a modern design with round corners, shadows etc
- you can generate images too! no need to write the "src" attribute, just write the "alt" in natural language like for StableDiffusion prompts, eg. <img alt="picture of a mountain with snow, high defintion, trending on art station" /> or <img alt="professional illustration of a chef kitchen, modern, high quality" />
`

// the root <div> should take the full screen width and height (using 100vw and 100vh).
const mainTemplate = (query: string) =>
  `${htmlRules}
- if the user ask for a "generator" or an "app", or "application", it means you should create an interactive page, add buttons that can trigger JS code
- if you add buttons to the page, don't forget to include the <script> necessary to run them
- Repeat: do not forget to put some javascript logic in the <script> tag and bind your buttons, to do meaningful actions!
- you know how to store an internal state, using a global javascript object
- if you need to generate complex html content, you can call this existing asyncronous function to interrogate another AI (you can write prompt instructions in it): window.queryOpenAI('... your request ...')
- you should inject the raw output from this function somewhere in your own div (eg using innerHTML)

The question and theme: ${query}

Your HTML response: `

// find images without content in our page, and replace them
const replaceImages = async () => {
  // first we need to find images without valid src

  setTimeout(() => {}, 1000)
}

const queryGPT3 = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: openAIModel,
    prompt,
    user: openAIUser,
    temperature: 0.7,
    max_tokens: 1700,
    top_p: 1,
    // best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: [stop],
  })
  const res = response?.data?.choices?.[0]?.text?.trim() || ''
  console.log(res)

  return res
}

// sub template shuld be pretty basic, ie just "content"
const subTemplate = (query: string) =>
  `${htmlRules}

The question and theme: ${query}

IMPORTANT: don't forget to generate valid javascript code instructions in a <script> tag to handle the app logic!

Your HTML response: `

const queryOpenAI = async (query: string) => {
  const prompt = subTemplate(query)
  const best = await queryGPT3(prompt)
  return best
}

if (typeof window !== 'undefined') {
  window['queryOpenAI'] = queryOpenAI
}

function App() {
  const [html, setHtml] = useState('<div></div>')
  const [query, setQuery] = useState('')

  async function explore() {
    const prompt = mainTemplate(query)

    const best = await queryGPT3(prompt)

    if (!best) {
      console.log('did not get enough results, aborting')
      return
    }

    setHtml(best)
  }

  async function replaceImages() {
    const images = document.getElementsByTagName('img')

    for (let i = 0; i < images.length; i++) {
      // get image src
      const src = images[i].src
      const alt = images[i].alt

      console.log('found image:', { src, alt })
      images[i].src = spinner.src
      // images[i].width = 300
      // images[i].height = 300
      images[i].src = await getImage(alt)
    }
  }

  useEffect(() => {
    console.log('some html changed! time to replace images')
    replaceImages()
  }, [html])

  return (
    <div>
      <div className="flex flex-col w-screen mt-4 mb-4 items-center justify-center">
        <div className="flex items-center space-x-4">
          <input
            className="w-[900px]"
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="How to make a cookie.."
          />
          <button type="button" onClick={() => explore()}>
            Explore
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

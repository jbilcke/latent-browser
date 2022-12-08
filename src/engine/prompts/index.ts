export const htmlRules = `
- At the end of this message, you will need to generate an application (html + javascript) to solve a specific question or problem, and your reply will have to be given as HTML content (with a root <div>).
- This HTML will be embedded in a webpage featuring Tailwind, so you absolutely must use Tailwind classes for the design.
- You can use jquery
- The colors should match stereotypical colors associated with those words (eg nature is green, water is blue etc)
- You can choose text and background color matching the theme (be creative, as long as it follows Tailwind design rules and color schemes).
- HTML content should be nice and centered, and feature paragraph, text in bold etc.. as you see fit.
- always use Tailwind CSS classes for styling elements (including <p>, <ul> and <li> elements)
- to make the page more friendly, do not hesitate to use emojis like if they were icons
- Your div must be centered using Tailwind classes for flexbox. Please use multiple columns, or vertically stacked content, as people don't like to scroll horizontally
- don't forget to add some padding and shadows, as well as round corners (using Tailwind utility classes)
- please use a modern design with round corners, shadows etc
- do not write empty code, write actual valid JS! Also, never write any empty or example functions
- do not write things like "by [You Name]", instead write "by Brainy"
- you know how to add complex Tailwind components, like toolbars, application and grid layout, so use them if necessary
- you can generate images too! no need to write the "src" attribute, just write the "alt" in natural language like for StableDiffusion prompts, eg. <img alt="picture of a mountain with snow, high defintion, trending on art station" /> or <img alt="professional illustration of a chef kitchen, modern, high quality" />
- please be detailed in the alt of images, and give an enumeration of what you want to display (colors, weather, place, camera type etc)
`

// the root <div> should take the full screen width and height (using 100vw and 100vh).
export const mainTemplate = (query: string) =>
  `${htmlRules}
- if the user ask for a "generator" or an "app", or "application", it means you should create an interactive page, add buttons that can trigger JS code
- if you add buttons to the page, don't forget to include the <script> necessary to run them
- Repeat: do not forget to put some javascript logic in the <script> tag and bind your buttons, to do meaningful actions!
- you should store information about app or game state in a global javascript object (attached to the window object for instance)
- you can use the canvas to draw, and user events (keyboard, mouse) to create an interactive experience
- if you need to generate complex html content, you can call \`window.queryOpenAI()\`, an existing asyncronous function to interrogate OpenAI (you can write prompt instructions in it, in natural language): \`await window.queryOpenAI('.. some GPT-3 prompt to generate something..')\`
- after resolving the async Promise, you should inject the raw output from this function somewhere in your own div (eg using innerHTML)

The question and theme: ${query}

Your HTML response: `

// sub template shuld be pretty basic, ie just "content"
export const subTemplate = (query: string) =>
  `${htmlRules}

The question and theme: ${query}

IMPORTANT: don't forget to generate valid javascript code instructions in a <script> tag to handle the app logic!
And PLEASE don't write comments like "// your code goes here", instead write the actual code!

Your HTML response: `

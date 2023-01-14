// the following instruction is disabled, as right now we cannot allow "freedom on install"
// You will decide install any javascript library you would like.

import { Settings } from '../../types'
import { Specification, SpecCategory, RawSpecification } from './types'

export const getPlannerPrompt = (query: string, settings?: Settings) =>
  `You are a senior frontend engineer who needs to develop a web application using only HTML and Javascript.
You are not going to code it yourself, instead you will write a valid spec of the app, in the form of JSON instructions.

Here are some examples, but don't copy them verbatim! instead you need to adapt to the application brief!

Brief: A back office application to help hot-dog stand business owners to manage stock
Spec: {
  "summary": "Back-office application to manage stocks for a hot-dog stand",
  "layout": "An application layout with a top navigation bar, a left menu to access app areas, and a central content section",
  "art direction": "The design has nods to hot-dogs (eg. use of orange, grey for the color), large text, use of funny emojis",
  "text content": "Text should be straight to the point, it contains labels, buttons and links to execute various of the application",
  "content": "There is a table with editable cells, one line per type of ingredient: bread, sausage, mustard, picked onion, fried onion etc. Columns are: ingredient icon (emoji), name, price, number in stock, and number to order. We also see the total price of items to order",
  "interactivity": "There is an input text where we can enter the number of expected customers, and JS code to automatically adjust the number of items to order and the total price",
  "js modules": "jQuery, oLdash",
  "images": "no image neeeded",
}

Brief: A startup website called Aisy about a new cool SaaS product for creators to create AI movies.
Spec: {
  "summary": "Website of startup called Aisy, selling an AI tool for making movies",
  "layout": "A classic SaaS product launch page, with a header section, a main content section, and a footer",
  "art direction": "The design is fresh and sleek, with a sans serif font abd original colors on the theme of AI and movies (purple, black, grey, red)",
  "text content": "Page contains marketing content to explain why people should use Aisy to generate movies. Text is concise and to the point, with punch lines for titles. It should make us wish we purchased the product.",
  "interactivity": "no javascript needed",
  "js modules": "no library available",
  "images": "The hero section image shows a woman using a computer in a coffeeshop. The page features multiple screenshots of the application, and also captures of examples movies generated with the tool (documentary, action movie..)"
}

Brief: A simulator to roll a dice. It has a simple design, with a dark background and yellow-orange interface. You can roll the dice by manually dragging it with the mouse.
Spec: {
  "summary": "js app to roll dices using the mouse",
  "layout": "A simple dice-rolling application page, with a huge title and a large HTML canvas content",
  "art direction": "The design should evoke tabletop games or casino, with a green background. Dices might be white, grey, either square or cubes. Emojis are used for buttons.",
  "text content": "There should be some instructions about how to roll the dices, explanations on which buttons to click, and some tips",
  "interactivity": "The app should have JS code to roll the dice whenever we click, drag and release on the HTML canvas",
  "js modules": "jQuery, Tone.js",
  "images": "no image needed",
  "mouse events": "When clicking on a dice, it should move it, and releasing the mouse should play a small animation to roll the dice",
  "keyboard events": "no keyboard events needed",
  "sounds": "We may generate a sound using tone.js to simulate the sound of a dice being dropped",
  "application logic": "A dice is a random number generator so we should see number inside it or next to in (in the html page), to see which random number was chosen upon rolling",
  "animations": "when the mouse button is released, it should spin for a few seconds before slowing down",
  "constraints": "The dice should not be able to get out of the canvas edges"
}

Brief: An encyclopedia article explaining what are asteroids, their orbits, their composition, and their dangers. The layout is simple, yet elegant, with a blue background, green titles, and a few pictures of asteroids and diagrams. The text is clear and scientific.
Spec: {
  "layout": "An encyclopedia-like layout, similar to scientific articles or Wikipedia. Images (if any) should be including within the body.",
  "art direction": "The design should be sober and elegant, without any emoji, using a serif font to make it looks like a book or printed article. Background should be white, foreground colors should be in shades of grey.",
  "text content": "The article should be written in a very rich and scientific tone, with a lot of details about the origins of the word asteroid, the history of their discovery, a scientific analysis of common asteroid composition, the impact on human society, the economics of asteroids, the risks associated with asteroids, and so on.",
  "references": "The article should includes scientific or book references at the end, like for a scientific article",
  "interactivity": "No javascript needed",
  "js modules": "jQuery, Three.js",
  "images": "the article should includes at least 5 or 6 pictures to illustration the diversity in asteroids compositions and shapes"
}

Real work is starting now. Remember, you MUST respect the brief carefully!
${settings?.customPlannerPrompt || ''}
Brief: ${query}
Spec: {`

export const taskValues = (spec: RawSpecification): string[] =>
  Object.entries(spec).map(([type, value]) => value.toLowerCase())

export const getCategory = (task: string): SpecCategory =>
  task.match(/(?:summary)/i)
    ? 'summary'
    : task.match(/(?:layout|template)/i)
    ? 'layout'
    : task.match(
        /(?:js|javascript|interactions?|code|interactivity|events?|application|logic|animations?)/i
      )
    ? 'script'
    : task.match(
        /(?:images?|photos?|pictures?|illustrations?|screenshots?|snapshots?)/i
      )
    ? 'image'
    : task.match(/(?:sounds?|musics?|soundtracks?|audio)/i)
    ? 'audio'
    : task.match(/(?:art|direction|colors?|theme|style|appearance)/i)
    ? 'style'
    : //: task.match(/(?:text|content|topic)/i)
      // ? 'content'
      'content'

export const getFinalSpec = (spec: RawSpecification): Specification =>
  Object.entries(spec).reduce((acc, [type, value]) => {
    const category = getCategory(type)
    const existing = acc[category] || []

    return {
      ...acc,
      [category]: existing.concat(value),
    }
  }, {} as Specification)

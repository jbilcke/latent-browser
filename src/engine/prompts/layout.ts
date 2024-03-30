import { stringify } from 'yaml'

import { getLayout } from '../templates'
import { Instructions } from './types'

export const layoutPrompt = (instructions: Instructions) =>
  `Transform the following HTML template into a full feature web page
- the template uses Tailwind classes
- you can make small changes such as add or remove items in <ul> lists
- if you change the colors then use Tailwind utility classes
- colors must be aligned with the guidelines
- write in English, not in latin
- all the image alt should be fully captioned and describe the image in details (the subject, how it was created, where, camera position, focal etc)
- important: replace all {{semantic blocks}} with an imaginary content (don't write back the instructions!)
- never repeat the JSON instructions verbatim

 
JSON instructions: ${JSON.stringify(
    {
      summary: instructions.summary,
      style: instructions.style,
      content: instructions.content,
      image: instructions.image,
    },
    null,
    2
  )}

HTML to transform:
${getLayout(
  stringify({
    summary: instructions.summary,
    layout: instructions.layout,
  })
)},

Don't forget to replace {{blocks}} with new imaginary content, but don't write the instructions themselves!
Result:`

export const layoutPromptLegacy = (instructions: Instructions) =>
  `/**
 * This function converts a Tailwind template into a webpage
 * - it will generate caption (alt) for images, with full description, complete enough to allow someone else to take the exact same picture (camera scene, exposure, textures, backgrounds etc)
 * - it can make some changes in the Tailwind classes to use colors more aligned with the guidelines, such as background colors and text colors
 * - the colors to use should be those frequently associated with the theme, stereotype, object or material (warm colors for festive, vacation, spain, blue for water or cold, green for nature etc)
 * - it writes in English, not Latin
 * - it instructions say to not add text, or images etc.. then don't add them!
 *
 * @returns a text where all the {{semantic blocks}} have been replaced with a plain text equivalent
 */
const out = generateWebpageWithAI({
  // HTML template with {{semantic blocks}} to replace by AI-generated text
  htmlTemplate: ${JSON.stringify(getLayout(stringify(instructions.layout)))},

  // Natural language rules used by the AI to define how to write the content and make small changes to the HTML
  // (eg. design change using Tailwind, or number of items etc)
  contentGenerationGuidelines: ${JSON.stringify({
    summary: instructions.summary,
    style: instructions.style,
    content: instructions.content,
    image: instructions.image,
  })});

console.log(out)
Output:`

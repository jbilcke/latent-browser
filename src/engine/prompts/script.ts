import DOMPurify from 'dompurify'
import { libraries } from './libraries'
import { Instructions } from './types'

/**
 * Notes about this prompt:
 * GPT-3 can add more libraries if needed
 */
export const genericScript =
  (id: string) => (instructions: Instructions, html: string) =>
    `Exercice: ${instructions.summary}:
${instructions.script.map((instruction) => `- ${instruction}`).join('\n')}

Note: Here are some optional libraries that may or may not be used:
${Object.values(libraries)
  .filter(({ basic }) => basic)
  .map(({ basic }) => `- ${basic}`)
  .join('\n')}
Attention: not all applications need all libraries. Games typically need Three.js, or pure canvas, maybe some Tone.js,
but normal apps usually only need lodash and jQuery.

Code formatting rules:
- we use 1 space for indentation
- all variables are compressed to max 3 characters
- this is the final project, not a demo or example
- there are no lines starting with "//", code comments are replaced by line returns
\`\`\`html
${
  // to save space, we only give essential info to the model
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['div', 'button', 'canvas'],
    ALLOWED_ATTR: ['classname', 'id', 'width', 'height'],
  }).replace(/(^[ \t]*\n)/gm, '') // remove all empty lines, too
}<script>var app={};`

export const scriptPrompt = genericScript('appData')

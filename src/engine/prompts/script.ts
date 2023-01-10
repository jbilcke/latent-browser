import DOMPurify from 'dompurify'
import { Settings } from '../../types'
import { Instructions } from './types'

/**
 * Notes about this prompt:
 * GPT-3 can add more libraries if needed
 */
export const genericScript =
  (id: string) =>
  (instructions: Instructions, html: string, settings?: Settings) =>
    `${instructions.summary}
${instructions.script.map((instruction) => `- ${instruction}`).join('\n')}
Code formatting rules:
- we use 1 space for indentation
- code is compressed, all JS variables have maximum 3 characters
- this is not a tutorial or a demo, but the final project
${settings?.customScriptPrompt || ''}
\`\`\`html
${
  // to save space, we only give essential info to the model
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['div', 'button', 'canvas'],
    ALLOWED_ATTR: ['classname', 'id', 'width', 'height'],
  }).replace(/(^[ \t]*\n)/gm, '') // remove all empty lines, too
}<script>var app={};`

export const scriptPrompt = genericScript('appData')

import DOMPurify from 'dompurify'

import { Instructions } from './types'

/**
 * Notes about this prompt:
 * the LLM can add more libraries if needed
 */
export const genericScript =
  (_id: string) => (instructions: Instructions, html: string) =>
    `${instructions.summary}
${instructions.script.map((instruction) => `- ${instruction}`).join('\n')}
Code formatting rules:
- we use 1 space for indentation
- code is compressed, all JS variables have maximum 3 characters
- we must store everything in appData, so please begin your code with \`var app = window.appData || {};\`
- this is not a tutorial or a demo, but the final project

Here is the current page structure:
\`\`\`html
${
  // to save space, we only give essential info to the model
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['div', 'button', 'canvas'],
    ALLOWED_ATTR: ['classname', 'id', 'width', 'height'],
  }).replace(/(^[ \t]*\n)/gm, '') // remove all empty lines, too
}
<script>
  window.appData = {};
</script>
\`\`\`

Your turn! remember we want the FINAL version. Don't comment on it (don't say "Sure, I will.." etc) and don't write HTML. Please only write VANILLA javascript code.

# Output
\`\`\`javascript
`

export const scriptPrompt = genericScript('appData')

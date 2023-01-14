import { Specification } from './types'

// note: I wish I could put those examples in their separate plugins,
// but we can combine them so example separation is difficult
const examples = `
# simple blog made by a dog
- "ui.theme|primaryText=#000000|secondaryText=#666666|foreground=#ffffff|background=#cccccc|accent=#ff0000":
- "flowbite.navbar|fluid=true|rounded=true":
  - "flowbite.button": "Home"
  - "flowbite.button": "About"
- "ui.p": >
    "Welcome to my blog! On this site you will
    know everything about my dog life. Woof, woof!"
# a one page book called "The Test" written by an anonymous developer, with two test paragraphs
- "pdf.file":
  - "pdf.h1": "The Test"
  - "pdf.author": "Anonymous Developer"
  - "pdf.h3": "Hello"
  - "pdf.p": "Hello. This is a test."
  - "pdf.h3": "World"
  - "pdf.p": "Hello, World!"
# minimalist page displaying the mouse cursor position, with a simple 2-chords song playing in the background
- "ui.h1": "Mouse tracking app"
- "ui.p": "Mouse cursor is at $mouse.x and $mouse.y"
- "music.song|isPlaying=true":
  - "music.track|steps=[[C3,E3,G3],[G3,B4,D4]]":
    - "music.instrument|type=synth"
# 3D app with three rgb balls of different size, without any UI except a title. Balls should become twice as big and white when the mouse is clicked
- "eval": "$a = $mouse.clicked ? 2 : 1"
- "eval": "$b = '#ffffff'"
- "ui.h2": "3D App Demo"
- "fiber.scene":
  - "fiber.ball|size={$a * 1.5}|color={$mouse.clicked ? $b : '#ff0000'}"
  - "fiber.ball|size={$a * 2.5}|color={$mouse.clicked ? $b : '#00ff00'}"
  - "fiber.ball|size={$b * 3.5}|color={$mouse.clicked ? $b : '#0000ff'}"`

export const getBuilderPrompt = (spec: Specification, apiDoc: string) =>
  `Build the YAML skeleton tree of a web page.
Documentation of available components and their parameters:
${apiDoc}

You are free to use the following variables (if you write JS expression you need to escape double quotes):
- $mouse.x: mouse coordinates in X
- $mouse.y: mouse coordinates in Y
- $mouse.clicked: true if mouse is clicked, false if not clicked

Rules:
- You can create new variables to change multiple items at once.
- The value of a YAML field can be either empty, a text string, or a YAML list of children elements.
- Attention: The text content is final, it must be fully written in english, not Latin!

Examples:
\`\`\`yaml
${examples}
${spec.summary}
`

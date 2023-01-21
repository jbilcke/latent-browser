// ⓪①②③④⑤⑥⑦⑧

import { Settings } from '../../types'
import { Specification } from './types'

// a new prompt designed to be "one shot"
export const turboPromptExamples = `ᐅA simple blog made by a dog${[
  `⓪ui.theme߷primary=#000000߷secondary=#666666߷fg=#ffffff߷bg=#cccccc߷accent=#ff0000`,
  `①ui.navbar߷fluid=true߷rounded=true`,
  `②ui.button߷Home`,
  `②ui.button߷About`,
  `①ui.p߷Welcome to my blog!
On this site you will
know everything about my dog life.
Woof, woof!`,
].join(
  ''
)}ᐅA one page book called "The Test" written by an anonymous developer, with two test paragraphs${[
  `⓪pdf`,
  `①pdf.h1߷The Test`,
  `①pdf.author߷Anonymous Developer`,
  `①pdf.h3߷Hello`,
  `①pdf.p߷Hello. This is a test.`,
  `①pdf.h3߷World`,
  `①pdf.p߷Hello, World!`,
].join(
  ''
)}ᐅminimalist page displaying the mouse cursor position, with a simple 2-chords song playing in the background${[
  `⓪ui.h1߷Mouse tracking app`,
  `⓪ui.p߷Mouse cursor is at $mouse.x and $mouse.y`,
  `⓪music.song߷isPlaying=true`,
  `①music.track߷steps=[['C3','E3','G3'],['G3','B4','D4']]`,
  `②music.instrument߷type=synth`,
].join(
  ''
)}ᐅ3D app with three rgb balls of different size, without any UI except a title. Balls should become twice as big and white when the mouse is clicked${[
  `⓪co.js⎝$a = $mouse.clicked ? 2 : 1⎞`,
  `⓪co.js⎝$b = '#ffffff'⎞`,
  `⓪ui.h2߷3D App Demo`,
  `①fb.scene`,
  `②fb.ball߷size=⎝$a * 1.5⎞߷color=⎝$mouse.clicked ? $b : '#ff0000'⎞`,
  `②fb.ball߷size=⎝$a * 2.5⎞߷color=⎝$mouse.clicked ? $b : '#00ff00'⎞`,
  `②fb.ball߷size=⎝$a * 3.5⎞߷color=⎝$mouse.clicked ? $b : '#0000ff'⎞`,
].join('')}`

export const getTurboPrompt = (
  spec: Specification,
  apiDoc: string,
  settings?: Settings
) =>
  `Build the YAML skeleton tree of a web page.
Documentation of available components and their parameters:
${apiDoc}

You are free to use the following variables (if you write JS expression you need to escape double quotes):
- $mouse.x: mouse coordinates in X
- $mouse.y: mouse coordinates in Y
- $mouse.clicked: true if mouse is clicked, false if not clicked

Rules:
- You can create new JS variables to change multiple items at once
- Attention: The text content is final, it must be fully written in english, not Latin!
- Symbols from ⓪ to ⑧ are used for indentation, so use them to control the scene tree depth
${settings?.customBuilderPrompt || ''}
Examples:
${turboPromptExamples}
Final instructions:
ᐅ${Object.entries(spec)
    .filter(([k, v]) => v?.length)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('. ')}⓪`

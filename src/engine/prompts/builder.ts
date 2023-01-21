import { type Settings } from 'types'
import { type Specification } from './types'

// note: I wish I could put those examples in their separate plugins,
// but we can combine them so example separation is difficult
const examples = `
# simple blog made by a dog
- "ui.page⎛primary≋#000000߷secondary≋#666666߷fg≋#ffffff߷bg≋#cccccc߷accent≋#ff0000":
  - "fl.navbar⎛fluid≋true߷rounded≋true":
    - "fl.button⎛Home"
    - "fl.button⎛About"
  - "ui.p⎛Welcome to my blog!
      On this site you will
      know everything about my dog life.
      Woof, woof!"
  - "co.image⎛photo portrait of a cute dog sticking the tongue in a living room, Sigma 24mm f/8, instagram"
# a one page book called "The Test" written by an anonymous developer (written in grey), with two test paragraphs in dark green and blue text color schemes
- "pf.pdf⎛":
  - "pf.h1⎛The Test"
  - "pf.author⎛color≋#484a48߷Anonymous Developer"
  - "pf.h3⎛color≋#16a42e߷Hello"
  - "pf.p⎛color≋#057317߷Hello. This is a test."
  - "pf.h3⎛color≋#1674a4߷World"
  - "pf.p⎛color≋#052c63߷Hello, World!"
# minimalist page displaying the mouse cursor position, with a simple 2-chords song playing in the background. It has a carousel showing a couple of picture of a guitar and piano. There is a side menu on the left for other actions.
- "ui.page⎛":
  - "fl.sidebar⎛":
    - "fl.sidebar_item⎛icon≋home߷children≋Home"
    - "fl.sidebar_item⎛icon≋info߷children≋Other"
  - "ui.content⎛":
    - "ui.h1⎛Mouse tracking app"
    - "ui.p⎛Mouse cursor is at ⎝$mouse.x⎞ and ⎝$mouse.y⎞"
    - "mu.song⎛isPlaying≋true":
      - "mu.track⎛steps≋⎝[['C3','E3','G3'],['G3','B4','D4']]⎞":
        - "mu.instrument⎛type≋synth"
    - "ui.h2⎛Images"
    - "ui.slider⎛height≋600px":
      - "co.image⎛photo of grand piano on a scene, bright lights, canon EOS | Sigma 85mm f/8"
      - "co.image⎛photo of violin in its case, close-up, Nikon D810 | ISO 64 | focal length 20mm | Aperture f/9 | Exposure Time 1/40 Sec"
# Landing page of a swiss german device manufacturer selling a mysterious watch to predict the future. It also offers some kind of time travelling insurance plan
- "ui.page⎛":
  - "ui.h2⎛TimeWatch. The future is bright."
  - "ui.p⎛Stay ahead of the masses and purchase our new time travel device, marvelously crafter in precious time-resistant materials. It's time to build your future."
  - "fl.testimonial⎛author≋Some Customer߷bio≋Executive Assistant߷caption≋photo of an average executive assistant, working on a computer, bokeh߷quote≋For me time is money, and TimeWatch changed my life."
  - "fl.feats⎛title≋Swiss German design.߷subtitle≋Your TimeWatch will truly be your companion for life."
    - "fl.feat⎛icon≋clock߷title≋Predict the future߷Predict the future, not the past. With the new TimeWatch you see what's coming see up to 2 days in advance. Pro users can see up to 7+ weeks."
    - "fl.feat⎛icon≋microscope߷title≋Incredible quality߷Made in the Swiss Alps our TimeWatch has been tested in deep space, on Mars, in the New York subway and in a wormhole. It truly passes the trial of time."
    - "fl.feat⎛icon≋health߷title≋SaveMyLife+߷Our special life insurance program! If you get injured our TimeSquad will travel back to time to save you. Don't worry, you will have no recollection of the event."
# 3D game app with three rgb balls of various size, there is no UI, but a 3D text saying "Booya". Balls should become twice as big and white when we click
- "ui.page⎛fullscreen≋true":
  - "co.js⎛⎝$a = $mouse.clicked ? 2 : 1⎞"
  - "co.js⎛⎝$b = '#ffffff'⎞"
  - "fb.scene⎛":
    - "fb.text3D⎛Booya"
    - "fb.ball⎛size≋⎝$a * 1.5⎞߷color≋⎝$mouse.clicked ? $b : '#ff0000'⎞"
    - "fb.ball⎛size≋⎝$a * 2.5⎞߷color≋⎝$mouse.clicked ? $b : '#00ff00'⎞"
    - "fb.ball⎛size≋⎝$a * 3.5⎞߷color≋⎝$mouse.clicked ? $b : '#0000ff'⎞"`

export const getBuilderPrompt = (
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
- You can create new variables to change multiple items at once.
- The value of a YAML field can be either empty, a text string, or a YAML list of children elements.
- Attention: The text content is final, it must be fully written in english, not Latin!
${settings?.customBuilderPrompt || ''}
Examples:
\`\`\`yaml
${examples}
\`\`\`

Final instructions:
${Object.entries(spec)
  .filter(([k, v]) => v?.length)

  // the hack is disabled for now, let's try!
  /*
  // temporary hack until we can figure out what to do with the rest
  .filter(([k, v]) => k === 'content' || k === 'summary')
  */

  .map(([k, v]) => `- ${k}: ${v.join('. ')}`)
  .join('\n')}
\`\`\`yaml
`

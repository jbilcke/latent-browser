import { CommonConfig, genericJSDoc, genericWebContent } from './templates'

const cssFramework = 'Tailwind'

const conf: CommonConfig = {
  cssFramework,
  design: [
    // Tailwind doesn't support text shadows out of the box for some reason
    // https://github.com/tailwindlabs/tailwindcss/issues/162
    `only use ${cssFramework} utility classes! Never use custom css classes and never use style attributes except for text shadows`,
    'you can dynamically add or remove those utility classes if needed',
    'always add padding inside blocks',
    'add shadows to elements',
    'prefer a vertical layout or responsive layout',
    'use emojis for your icons',
    'choose colors from the Tailwind color palette based on the word used',
    'never generate divs side by side without a margin or padding',
    'prefer the flex and grid layout with a gap',
    'use stereotypical colors eg. if the brief is about nature use green, if this is about water or the sea use blue etc',
    'prefer vertical centering when possible',
    'do not hesitate to add toolbars, button, dropdown, when necessary',
    'if the brief is asking for a simulator, ab emulator or a game, you must handle keyboard and mouse interaction using JS, and you may have to use the <canvas>',
  ],
  logic: [
    'NEVER use alert() and instead directly write in one of the <div> of the page',
    'DO NOT sign your app with text like "By [Name]"',
    'if you need a canvas, do not forget to add a <canvas> container with a unique ID,so your JS code can access it',
    'this is not a tutorial, so NEVER write empty or incomplete JS functions, write the actual code implementation',
    'NEVER write things like "// implement the logic here" or "// TODO", you MUST write the actual code!',
  ],
  // https://pitch.com/v/DALL-E-prompt-book-v1-tmd33y
  images: [
    'you can add images using natural language description, like so: <img src="" alt="a picture of something" />',
    'images are best suited for websites and articles, or tutorials, but it may not make sense to have images for games and apps',
    'do not add the src="", it won\'t be read',
    'it is important to create a descriptive alt text, so the alt caption must be explicit',
    'append at the end of the alt caption words like "realistic" and "photography"',
    'to compose the alt caption start with some framing, the shooting context, the lighting settings, information about the camera',
    'for instance you can descripe a close-up, medium shot, long shot, or extreme long shot',
    'camera can be overhead, low angle, aerial view, titled frame',
    'lens can be: fast shutter speed, slow shutter speed, bokeh, motion blur, telephoto lens, macro lens, wide angle lens, deep depth of field',
    'light can be: warm lighting, cold, flash photography, high-key lighting, low-key lighting, backlighting or backlit, studio lighting',
    'if you want to imitate the style of a particular work of art or artist you can add the name at the end',
    'add also some background context about the scene, is that in interior, exterior, outside, in a home, restaurant, on a table, in the city, in the nature etc',
  ],
  direction: [
    'generally in website we like commercial images, with a lot of light, high-key, studio lighting, close-ups',
    'if the brief is for a more real topic (eg. an article, a newspaper report)',
    'choose the appropriate color scheme and image tone depending on the brief',
  ],
  params: [
    `{string} brief instructions given in natural language`,
    `{Object} rules - some rules to control the look of the app`,
    `{string} rules.framework - The CSS class framework to use - you must only use this for styling`,
    `{string[]} rules.design - Mandatory rules of design: how to create the HTML layout, design patterns..`,
    `{string[]} rules.logic - Mandatory rules for JS code and app logic: how to manage variables, libraries..`,
    `{string[]} rules.images - Mandatory rules for defining how to write the alt= text of <img>: keywords to use, format..`,
    `{string[]} rules.direction - The general art direction and composition rules of both the web page and the images`,
  ],
  returns: `{string} HTML and JS content (a root <div> and a <script>)`,
  modules: [
    `import * as $ from 'jquery'; // jQuery 3.6.1`,

    // we use r124 and not r125
    // unfortunately the latest version of three.js >= r125 introduced a breaking change, which break a lot of things
    `import * as THREE from 'three'; // Three.js r124, to draw 3D WebGL content in a <canvas>`,
    // `import * as THREE from 'three'; // Three.js r125, to draw 3D WebGL content in a <canvas> (note: THREE.Geometry has been replaced by THREE.BufferGeometry)`,

    `import * as Tone from 'tone'; // Tone.js 14.7.77, to generate sounds`,
    // `import * as Konva from 'konva'; // Konva, a library to work with HTML5 <canvas>`,
  ],
}

export const webApp = genericWebContent(
  'app',
  'generateWebApp',
  'Returns a web application that matches a brief',
  conf,

  // the web app is a generic html generator, which has an extra super-power:
  // it can generate code using an asyncronous function
  `${genericJSDoc(
    'An asynchronous function that returns web content that matches a brief',
    `It will be injected in a <div> somewhere in the page.
It generates valid HTML and JS, without any error and exception.`,
    conf.params,
    '{Promise<string>} HTML and JS content (a root <div> and a <script>)'
  )}
import { 'generateWidget' } from 'ai'
`
)

// this asyncronous function is defined here
export const webComponent = (name: string, query: string) =>
  genericWebContent(
    name,
    'generateWidget',
    'An asynchronous function that returns web content that matches a brief',
    conf
  )(query)

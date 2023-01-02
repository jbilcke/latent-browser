import {
  CommonConfig,
  genericJSDoc,
  genericHtml,
  genericScript,
} from './templates'

const cssFramework = 'Tailwind'

export type Tasks = Record<string, string>

const conf: CommonConfig = {
  cssFramework,
  design: [
    // Tailwind doesn't support text shadows out of the box for some reason
    // https://github.com/tailwindlabs/tailwindcss/issues/162
    `ALWAYS use ${cssFramework} utility classes!',
    'NEVER use custom css classes and never use style attributes except for text shadows`,
    'NEVER write lorem ipsum text or latin placeholder text',
    'NEVER repeat the brief or those instructions',
    'for colors, either use instructions from the brief or use stereotype colors like blue is for water-related, green for nature-related etc',
    `please use multiple colors from ${cssFramework} palette for text-* and bg-* utility classes`,
    'NEVER write bare HTML tags without a class, instead use utility classes',
    `use text and background colors from ${cssFramework} palette, depending on the brief color scheme`,
    'ALWAYS use rounded corners and large paddings, it is more pleasant',
    'OFTEN USE box shadows on containers and buttons',
    `use large font size for titles, using text size classes from ${cssFramework}`,
    'prefer a vertical layout and/or responsive layout',
    'use emojis for all your icons',
    'never generate divs without a margin or padding, prefer flex and grid layout with a gap',
    'for webapps you must add toolbars, button, dropdowns etc when necessary',
    'if the brief is asking for a simulator, an emulator or a game, you must handle keyboard and mouse interaction using JS, and you may have to use the <canvas>',
    'DO NOT sign your app with text like "By [Name]"',
    'if you need a canvas, do not forget to add a <canvas> container with a unique ID, so your JS code can access it',
    'if you create a <canvas>, make it large enough (eg. screen width)',
  ],
  logic: [
    'NEVER use alert() and instead directly write in one of the <div> of the page',
    `for interactivity you can dynamically add or remove ${cssFramework} utility classes with javascript`,
    'this is not a tutorial, so NEVER write empty or incomplete JS functions, write the actual code implementation',
    'NEVER write things like "// implement the logic here" or "// TODO", you MUST write the actual code!',
    'write a valid code example, not "// TODO: implement logic here"',
    'writing TODOs and latin is forbidden, and you are FORBIDDEN from using the "import .. from.." syntax or require()',
    'you can store persistent data inside the window.appData object',
  ],
  // https://pitch.com/v/DALL-E-prompt-book-v1-tmd33y
  images: [
    'you can add images using natural language description, like so: <img src="" alt="a picture of something" />',
    'images are best suited for websites and articles, or tutorials, but it may not make sense to have images for games and apps',
    'do not add the src="", it won\'t be read',
    'it is important to create a descriptive alt text, so the alt caption must be explicit',
    'append at the end of the alt caption words like "realistic" and "photography"',
    'to compose the alt caption start with some framing, the shooting context, the lighting settings, information about the camera',
    'for instance you can describe a close-up, medium shot, long shot, or extreme long shot',
    'camera can be overhead, low angle, aerial view, titled frame',
    'lens can be: fast shutter speed, slow shutter speed, bokeh, motion blur, telephoto lens, macro lens, wide angle lens, deep depth of field',
    'light can be: warm lighting, cold, flash photography, high-key lighting, low-key lighting, backlighting or backlit, studio lighting',
    // 'if you want to imitate the style of a particular work of art or artist you can add the name at the end',
    'add also some background context about the scene, is that in interior, exterior, outside, in a home, restaurant, on a table, in the city, in the nature etc',
  ],
  direction: [
    'generally in website we like commercial images, with a lot of light, high-key, studio lighting, close-ups',
    // 'if the brief is for a more real topic (eg. an article, a newspaper report) then use realistic lighting',
    'use stereotypical color scheme to fit the brief (for instance green if this is about nature, blue if about water etc)',
    'never write in Latin! for instance never write placeholder "lorem ipsum" content',
  ],
  params: [
    `{Object} brief instructions given in natural language`,
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
    `import * as THREE from 'three'; // Three.js r124, to draw 3D WebGL content in a <canvas>. Try using FirstPersonControls and FlyControls! But you cannot use textures.`,
    // `import * as THREE from 'three'; // Three.js r125, to draw 3D WebGL content in a <canvas> (note: THREE.Geometry has been replaced by THREE.BufferGeometry)`,

    `import * as Tone from 'tone'; // Tone.js 14.7.77, to generate sounds`,
    // `import * as TWEEN from 'tweenjs'; // Tween.js 18.5.0, to make smooth animations`,

    //  `import * as Konva from 'konva'; // Konva, a library to work with HTML5 <canvas> (note: be descriptive in your image file names, to explain if it's a texture, sprite..)`,
  ],
}

export const htmlPrompt = genericHtml(
  'generateHTML',
  'Returns a web application that matches a brief',
  conf
)

export const scriptPrompt = genericScript(
  'appData',
  'generateJavascript',
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
import { generateHTMLContent } from 'ai'
`
)

export const subHtmlPrompt = (name: string, query: string) =>
  genericHtml(
    'generateHTMLContent',
    'An asynchronous function that returns web content that matches a brief',
    conf
  )(query)

// the following instruction is disabled, as right now we cannot allow "freedom on install"
// You will decide install any javascript library you would like.

export const tasksPrompt = (query: string) =>
  `You are a senior frontend engineer who needs to develop a web application using only HTML and Javascript.
You are not going to code it yourself, instead you will write a valid spec of the app, in the form of JSON instructions.
You do not need to use Three.js, lights, cameras.. is there is no mention of 3D or WebGL. For instance if the brief is a bout a 2D game, you can write the app logic using a 2D <canvas>.

Here are some examples, but don't copy them verbatim! instead you need to adapt to the application brief!

Brief: A WebGL simulator to roll two dice. It has a simple design, with a dark background and yellow-orange interface. You can rotate the dice by pressing the left or right arrows, or by manually dragging them with the mouse.
Spec: {
  "Layout": "Implement the HTML layout of a WebGL simulator to roll two dices. Use a dark background and yellow-orange for the UI. Insert a <canvas> for drawing a dice.",
  "Main": "Use Javascript and the Three.JS library to draw a dice inside the <canvas> (use the canvas ID to access it). Use Javascript and the Three.JS library to draw a dice inside the <canvas> (use the canvas ID to access it). You can represent a dice as a cube with 1 to 6 dots in it to represent a number, of use a digit if that's too complicated. Don't forget to add a surface on which the dice is rolling. You should also add some light, and shading on the dice. The camera should be at the right distance, in isometric view.",
  "Keyboard events": "Add a callback for keyboard events to rotate and roll the dices when we press the left or right arrow",
  "Mouse events": "Add a callback for mouse drag events to rotate and roll the dices when we drag the mouse, for instance by moving the dice along the mouse's coordinates when we press the mouse, and roll the dice when we release the mouse button",
  "Animations": "When a dice is rolling, animate it for a few moment. As it is a cube, you can rotate it and move it for a few seconds in the direction of the mouse direction",
  "Constraints": "The dice should not be able to get out of the canvas edges"
}

Brief: An encyclopedia article explaining what are asteroids, their orbits, their composition, and their dangers. The layout is simple, yet elegant, with a blue background, green titles, and a few pictures of asteroids and diagrams. The text is clear and scientific.
Spec: {
  "Layout": "Implement the HTML layout of an article. Use a simple layout, for instance a central container with vertically spaced paragraphs. The top parent div should have a blue background. Titles should be large, and in green. Add enough padding inside the paragraphs.",
  "Content": "Write an article explaining what are asteroids, their orbits, their composition, and their dangers. It should have multiple paragraphs (for instance, 8, 10 etc or more) explaning in a scientific way each topic.",
  "Images": "The article must contain a few pictures of asteroids and diagrams to illustrate each section.",
  "Constraints": "The dice should not be able to get out of the canvas edges."
}

Real work is starting now. Remember, you MUST respect the application brief carefully!

Brief: ${query}
Spec: {`

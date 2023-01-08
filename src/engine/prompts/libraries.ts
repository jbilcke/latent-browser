import { ModulePath } from './types'

// why do we use a CDN path in the prompt, and not a shorter "NPM" import?
// because we want GPT-3 to have freedom of though and import real JS libraries at its discretion
// that's right: GPT-3 recognizes that skypack is a CDN which allows arbitrary module inject
export const CDN = 'https://cdn.skypack.dev/pin/'

// TO generate a production URL please see https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized

// note: the version are not randoly chose, those are the versions *suggested* by GPT-3
export const libraries: Record<string, ModulePath> = {
  lodash: {
    minimal: `Lodash (for data structure utilities)`,
    basic: `window._; // Lodash (for data structure utilities)`,
    prompt: `import _ from "${CDN}lodash.js";`,
    prod: `import _ from "${CDN}lodash@v4.17.21-K6GEbP02mWFnLA45zAmi/mode=imports,min/optimized/lodash.js";`,
  },
  /*
  canvasUtils: {
    prompt: `import { canvasUtils } from "${CDN}canvas-utils";`,
    prod: `import { canvasUtils } from "${CDN}canvas-utils@v0.8.0-7eSWrgib70dQwFrG94u2/mode=imports,min/optimized/canvas-utils.js";`,
  },
  */
  jQuery: {
    minimal: `jQuery (for DOM manipulation)`,
    basic: `window.$; // jQuery (for DOM manipulation)`,
    prompt: `import $ from "${CDN}jquery.js";`,
    prod: `import $ from "${CDN}jquery@v3.5.1-GJsJJ2VEWnBDZuot9fRf/mode=imports,min/optimized/jquery.js";`,
  },
  /*
  konva: {
    prompt: `import Konva from "${CDN}konva";`,
    prod: `import Konva from "${CDN}konva@v7.0.5-kBbtR70EUxGbuI3tpoKi/mode=imports,min/optimized/konva.js";`,
  },
  */
  tone: {
    minimal: `Tone.js (for sound synthesis)`,
    basic: `window.Tone; // tone.js (for sound synthesis)`,
    prompt: `import Tone from "${CDN}tone.js";`,
    prod: `import Tone from "${CDN}tone@v13.8.25-Y8DZtCNdyebBxcPTSCWz/mode=imports,min/optimized/tone.js";`,
  },
  three: {
    minimal: `Three.js (for 3D games, also has FirstPersonControls, FlyControls and OrbitControls)`,
    basic: `window.THREE; // Three.js (for 3D games, also has FirstPersonControls, FlyControls and OrbitControls)`,
    prompt: `import * as THREE from "${CDN}three.js";`,
    prod: `import * as THREE from "${CDN}three@v0.147.0-OePr4dXxGMRPSzlPRCyx/mode=imports,min/optimized/three.js";`,
  },
  /*
  threeFirstPersonControls: {
    // don't give magic potion to GPT3! it already knows about FirstPersonControls
    prompt: '', // `import * from "${CDN}three.js/examples/js/controls/FirstPersonControls.js";`,
    prod: `import * from "${CDN}three.js@v0.77.1-G2wF26QQDO6n9jckAKtK/mode=raw,min/0.124.0/examples/js/controls/FirstPersonControls.js";`,
  },
  threeFlyControls: {
    // don't give magic potion to GPT3! it already knows about FlyControls
    prompt: '', // `import * from "${CDN}three.js/examples/js/controls/FlyControls.js";`,
    prod: `import * from "${CDN}three.js@v0.77.1-G2wF26QQDO6n9jckAKtK/mode=raw,min/0.124.0/examples/js/controls/FlyControls.js";`,
  },
  threeOrbitControls: {
    // don't give magic potion to GPT3! it already knows about OrbitControls
    prompt: '', // `import * from "${CDN}three.js/examples/js/controls/OrbitControls.js";`,
    prod: `import * from "${CDN}three.js@v0.77.1-G2wF26QQDO6n9jckAKtK/mode=raw,min/0.124.0/examples/js/controls/OrbitControls.js";`,
  },
  */
  /*
  tween: {
    minimal: `Tween.js (for smooth animations)`,
    basic: `window.TWEEN; // Tween.js (for smooth animations)`,
    prompt: `import TWEEN from "${CDN}@tweenjs/tween.js";`,
    prod: `import TWEEN from "${CDN}@tweenjs/tween.js@v18.6.0-Rr2mERKp2GTA0yArmM61/mode=imports,min/optimized/@tweenjs/tweenjs.js";`,
    // 16.3.5
  },
  */
}

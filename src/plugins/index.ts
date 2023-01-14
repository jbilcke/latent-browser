import { core } from './core'
import { ui } from './ui'
import { daisyui } from './daisyui'
import { flowbite } from './flowbite'
import { fiber } from './fiber'
import { music } from './music'
import { pdf } from './pdf'
import { type Plugins } from './types'
import { getComponents, getDocumentation } from './build'

// expose all the plugins components onto the same level
export const plugins: Plugins = {
  core,
  ui,
  // daisyui, // note: also re-enable it in the tailwind config then (in the bottom -> plugins)
  flowbite,
  fiber,
  music,
  pdf,
}

export const components = getComponents(plugins)
export const apiDoc = getDocumentation(plugins)

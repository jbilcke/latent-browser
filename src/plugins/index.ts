import { core } from './core'
import { ui } from './ui'
import { daisyui } from './daisyui'
import { flowbite } from './flowbite'
import { fiber } from './fiber'
import { music } from './music'
import { pdf } from './pdf'
import { type Plugins } from './types'
import { getIndex, getComponents, getDocumentation } from './build'
import Fuse from 'fuse.js'

// expose all the plugins components onto the same level
export const plugins: Plugins = {
  core,
  ui,
  // daisyui, // note: also re-enable it in the tailwind config then (in the bottom -> plugins)
  fl: flowbite,
  fb: fiber,
  mu: music,
  pf: pdf,
}

export const components = getComponents(plugins)
export const apiDoc = getDocumentation(plugins)
export const globalIndex = getIndex(components)

export const scopedIndexes = Object.entries(plugins).reduce(
  (acc, [name, plugin]) => ({
    ...acc,
    [name]: getIndex(
      // ok so.... getComponents wasn't designed to work on ONE plugin but hey.. it works anyway!
      getComponents({ [name]: plugin })
    ),
  }),
  {}
)

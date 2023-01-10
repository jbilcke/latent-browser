import { build } from './build'
import { core } from './core'
import { daisyui } from './daisyui'
import { flowbite } from './flowbite'

// our collection of API Kits
export const kits = {
  ...core,
  // daisyui,
  ...flowbite,
}

// a string file acting as documentation
export const docs = build(kits)

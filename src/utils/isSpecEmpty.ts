import { Specification } from '../engine/prompts'

export const isSpecEmpty = (spec?: Specification): boolean => {
  if (!spec) {
    return false
  }

  try {
    const specs = Object.entries(spec)
    return specs.length > 0
  } catch (err) {
    return false
  }
}

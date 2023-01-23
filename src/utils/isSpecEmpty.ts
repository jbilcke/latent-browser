import { Specification } from '~/prompts'

export const isSpecEmpty = (spec?: Specification): boolean => {
  if (!spec) {
    return true
  }

  try {
    const specs = Object.entries(spec)
    return !specs.length
  } catch (err) {
    return true
  }
}

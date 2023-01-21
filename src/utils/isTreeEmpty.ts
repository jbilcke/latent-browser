import { type ComponentTree } from 'engine/prompts'

export const isTreeEmpty = (tree?: ComponentTree): boolean => {
  if (!tree) {
    return true
  }

  try {
    const t = Object.entries(tree)
    return !t.length
  } catch (err) {
    return true
  }
}

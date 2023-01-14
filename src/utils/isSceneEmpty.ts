import { Scene } from '../engine/prompts'

export const isSceneEmpty = (scene?: Scene): boolean => {
  if (!scene) {
    return false
  }

  try {
    const tree = Object.entries(scene)
    return tree.length > 0
  } catch (err) {
    return false
  }
}

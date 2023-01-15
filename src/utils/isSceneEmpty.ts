import { Scene } from '../engine/prompts'

export const isSceneEmpty = (scene?: Scene): boolean => {
  if (!scene) {
    return true
  }

  try {
    const tree = Object.entries(scene)
    return !tree.length
  } catch (err) {
    return true
  }
}

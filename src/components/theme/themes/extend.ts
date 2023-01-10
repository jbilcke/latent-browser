import { Theme } from '../types'

export const extend = (extending: Theme, newTheme: Partial<Theme>): Theme => {
  return { ...extending, ...newTheme }
}

import { Theme, Themes } from '../types'
import { base } from './base'
import { dark } from './dark'

export const DEFAULT_THEME: Theme = base
export const DEFAULT_THEME_ID = 'base'

export const themes: Themes = {
  base,
  dark,
}

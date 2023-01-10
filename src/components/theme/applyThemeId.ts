import { themes } from '.'
import { mapTheme } from './mapTheme'
import { MappedTheme } from './types'

export const applyThemeId = (theme: string): void => {
  const themeObject: MappedTheme = mapTheme(themes[theme])
  if (!themeObject) {
    return
  }

  const root = document.documentElement

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return
    }

    root.style.setProperty(property, themeObject[property])
  })
}

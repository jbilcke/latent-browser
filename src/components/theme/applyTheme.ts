import { mapTheme } from './mapTheme'
import { MappedTheme, Theme } from './types'

export const applyTheme = (theme: Theme): void => {
  const themeObject: MappedTheme = mapTheme(theme)
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

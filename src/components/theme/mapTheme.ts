import { Theme, MappedTheme } from './types'

export const mapTheme = (variables: Theme): IMappedTheme => {
  return {
    '--color-primary': variables.primary || '',
    '--color-secondary': variables.secondary || '',
    '--color-positive': variables.positive || '',
    '--color-negative': variables.negative || '',
    '--color-text-primary': variables.textPrimary || '',
    '--background-primary': variables.backgroundPrimary || '',
    '--background-sec': variables.backgroundSecondary || '',
  }
}

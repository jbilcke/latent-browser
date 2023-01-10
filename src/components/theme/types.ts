export interface Theme {
  primary: string
  secondary: string
  negative: string
  positive: string
  textPrimary: string
  backgroundPrimary: string
  backgroundSecondary: string
}

export interface Themes {
  [key: string]: Theme
}

export interface MappedTheme {
  [key: string]: string | null
}

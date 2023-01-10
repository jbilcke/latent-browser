import { useEffect, useState } from 'react'
import { DEFAULT_THEME } from './themes'
import { applyTheme } from './applyTheme'

// theme managed based on whole themes passed as params,
// which is ideal for our AI template
export const useTheme = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return [theme, setTheme]
}

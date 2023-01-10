import { useEffect, useState } from 'react'
import { DEFAULT_THEME_ID } from './themes'
import { applyThemeId } from './applyThemeId'

// theme managed based on theme ids, which is ideal for the browser UI itseld
export const useThemeId = () => {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID)

  useEffect(() => {
    applyThemeId(themeId)
  }, [themeId])

  return [themeId, setThemeId]
}

import * as Bowser from 'bowser'

const VERSION = `Web4/0.0.5`

export const getLatentBrowserName = () => {
  if (typeof window !== 'undefined') {
    const result = Bowser.parse(window.navigator?.userAgent)
    return `${VERSION} (${result.os.name}; ${
      result.os.versionName || result.os.versionName || 'unknown'
    })`
  } else {
    return `${VERSION}`
  }
}

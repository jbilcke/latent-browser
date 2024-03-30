
import { App } from '../types'
import { useLocalStorage } from './useLocalStorage'

export const useStoredApps = () =>
  useLocalStorage<App[]>('LatentBrowser_useStoredApps_revision_1', [])

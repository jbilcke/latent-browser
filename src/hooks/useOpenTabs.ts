import { AppTab } from '../types'
import { useLocalStorage } from './useLocalStorage'

export const useOpenTabs = (defaultValue: AppTab[] = []) =>
  useLocalStorage<AppTab[]>('LatentBrowser_useOpenTabs_revision_1', defaultValue)

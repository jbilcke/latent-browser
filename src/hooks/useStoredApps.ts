import { useLocalStorage } from '@mantine/hooks'
import { App } from '../types'

export const useStoredApps = () => {
  return useLocalStorage<App[]>({
    key: 'stored-apps-001',
    defaultValue: [],
  })
}

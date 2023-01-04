import { useLocalStorage } from '@mantine/hooks'
import { AppTab } from '../types'

export const useOpenTabs = (defaultValue: AppTab[] = []) =>
  useLocalStorage<AppTab[]>({
    key: 'open-tabs-rev-1',
    defaultValue,
  })

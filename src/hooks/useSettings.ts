import { useLocalStorage } from '@mantine/hooks'
import { Settings } from '../types'

export const useSettings = (
  defaultValue: Settings = {
    openAIKey: '',
    openAIModel: 'text-davinci-003',
  }
) =>
  useLocalStorage<Settings>({
    key: 'settings-rev-1',
    defaultValue,
  })

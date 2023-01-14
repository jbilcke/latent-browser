import { useLocalStorage } from '@mantine/hooks'
import { Settings } from '../types'

export const useSettings = (
  defaultValue: Settings = {
    coreVendor: 'OpenAI',
    huggingFaceKey: '',
    huggingFaceModel: 'EleutherAI/gpt-j-6B',
    openAIKey: '',
    openAIModel: 'text-davinci-003',
    customSpecPrompt: '',
    customScenePrompt: '',
    customDerivationPrompt: '',
    useMockData: false,
    useAutoCherryPick: false,
    useVendorCherryPick: false,
    speechToTextLanguage: '',
  }
) =>
  useLocalStorage<Settings>({
    key: 'settings-rev-2',
    defaultValue,
  })

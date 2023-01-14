import { useLocalStorage } from '@mantine/hooks'
import { Settings } from '../types'

export const useSettings = (
  defaultValue: Settings = {
    coreVendor: 'OpenAI',
    coreSpeechToTextLanguage: '',
    huggingFaceKey: '',
    huggingFaceModel: 'EleutherAI/gpt-j-6B',
    openAIKey: '',
    openAIModel: 'text-davinci-003',
    customPlannerPrompt: '',
    customBuilderPrompt: '',
    customImproverPrompt: '',
    useMockData: false,
    useAutoCherryPick: false,
    useVendorCherryPick: false,
  }
) =>
  useLocalStorage<Settings>({
    key: 'settings-rev-2',
    defaultValue,
  })

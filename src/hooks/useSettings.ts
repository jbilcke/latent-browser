"use client"

import { Settings } from '../types'
import { useLocalStorage } from './useLocalStorage'

export const useSettings = (
) =>
  useLocalStorage<Settings>('LatentBrowser_useSettings_revision_1', {
    coreVendor: 'OpenAI',
    huggingFaceKey: '',
    huggingFaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    openAIKey: '',
    openAIModel: 'gpt-3.5-turbo-instruct',
    customTasksPrompt: '',
    customHtmlPrompt: '',
    customScriptPrompt: '',
    useMockData: false,
    useAutoCherryPick: false,
  })

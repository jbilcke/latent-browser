"use client"

import { Settings } from '../types'
import { useLocalStorage } from './useLocalStorage'

export const useSettings = (
) =>
  useLocalStorage<Settings>('LatentBrowser_useSettings_revision_2', {
    coreVendor: 'OPENAI',
    huggingFaceKey: '',
    huggingFaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    openAIKey: '',
    openAIModel: 'gpt-4-turbo',
    customTasksPrompt: '',
    customHtmlPrompt: '',
    customScriptPrompt: '',
    useMockData: false,
    useAutoCherryPick: false,
  })

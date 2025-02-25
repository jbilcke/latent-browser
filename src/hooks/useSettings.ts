"use client"

import { Settings } from '../types'
import { useLocalStorage } from './useLocalStorage'

import { imagineHTML as openaiImagineHTML, imagineJSON as openaiImagineJSON, imagineScript as openaiImagineScript } from '@/providers/openai'
import { imagineHTML as anthropicImagineHTML, imagineJSON as anthropicImagineJSON, imagineScript as anthropicImagineScript } from '@/providers/anthropic'


export const useSettings = (
) => {
  const [settings, setSettings] = useLocalStorage<Settings>('LatentBrowser_useSettings_revision_2', {
    coreVendor: 'OPENAI',
    huggingFaceKey: '',
    huggingFaceModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    openAIKey: '',
    openAIModel: 'gpt-4o',
    anthropicKey: '',
    anthropicModel: 'claude-3-7-sonnet-latest',
    customTasksPrompt: '',
    customHtmlPrompt: '',
    customScriptPrompt: '',
    useMockData: false,
    useAutoCherryPick: false,
  })

  const getParams = (): {
    model: string
    apiKey: string
    mockData: boolean
    imagineHTML: ({ prompt, model, apiKey, mockData, }: {
      prompt: string;
      model?: string;
      apiKey?: string;
      mockData?: boolean;
    }) => Promise<string>
    imagineScript: ({ prompt, model, apiKey, mockData, }: {
      prompt: string;
      model: string;
      apiKey?: string;
      mockData?: boolean;
    }) => Promise<string>
    imagineJSON: <T>({ prompt, defaultValue, prefix, model, apiKey, mockData, }: {
      prompt: string;
      defaultValue: T;
      prefix: string;
      model?: string;
      apiKey?: string;
      mockData?: boolean;
    }) => Promise<T>
  } => {
    const model = settings?.coreVendor === 'ANTHROPIC' ? settings.anthropicModel : `${settings?.openAIModel || ''}`
    const apiKey = settings?.coreVendor === 'ANTHROPIC' ? settings.anthropicKey : `${settings?.openAIKey || ''}`
    const mockData = settings ? !!(settings?.useMockData) : false

    // TODO @julian: we could currify those functionse with the model and apiKey predefined
    const imagineHTML = settings?.coreVendor === 'ANTHROPIC' ? anthropicImagineHTML : openaiImagineHTML
    const imagineScript = settings?.coreVendor === 'ANTHROPIC' ? anthropicImagineScript : openaiImagineScript
    const imagineJSON = settings?.coreVendor === 'ANTHROPIC' ? anthropicImagineJSON : openaiImagineJSON

    return { model, apiKey, mockData, imagineHTML, imagineScript, imagineJSON }
  }

  return { settings, setSettings, getParams }
}

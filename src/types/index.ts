export type AppType = 'search' | 'content' | 'favorites' | 'settings'

export interface App {
  // unique app ID (very important)
  id: string

  // app title (and tab title)
  title: string

  // subtitle (not very used right now)
  subtitle: string

  // the mini-prompt visible in the top bar
  prompt: string

  // specification used to generate the HTML and script
  tasks: Record<string, string>

  // source code of the HTML layout
  html: string

  // specification used to generate the page text
  text: Record<string, string>

  // source code of the script (app logic)
  script: string

  // persisted data
  data: Record<string, any>
}

export interface Tab {
  isActive: boolean

  isFavorite: boolean

  type: AppType

  // the tab is not a rehydrated app
  isNew: boolean
}

export type AppTab = App & Tab

export interface Link {
  title: string
  alt: string
}
export interface Settings {
  coreVendor: string
  huggingFaceKey: string
  huggingFaceModel: string
  openAIKey: string
  openAIModel: string
  customTasksPrompt: string
  customLayoutPrompt: string
  customScriptPrompt: string
  useAutoCherryPick: boolean
  useVendorCherryPick: boolean
  useMockData: boolean
}

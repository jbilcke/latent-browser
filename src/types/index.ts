export type AppType = 'search' | 'content' | 'favorites'

export interface App {
  // unique app ID (very important)
  id: string

  // mostly used for tabs
  type: AppType

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

  // source code of the script (app logic)
  script: string

  // persisted data
  data: Record<string, any>
}

export interface Link {
  title: string
  alt: string
}

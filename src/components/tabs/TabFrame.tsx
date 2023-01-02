import { memo } from 'react'
import { App } from '../../types'

export const TabIFrame = (app: App) => {
  return (
    <iframe
      id={app.id}
      className="absolute w-screen h-[calc(100vh-81px)] border-none shadow-google"
      src={`/${app.type}?app=${encodeURIComponent(JSON.stringify(app))}`}
    />
  )
}

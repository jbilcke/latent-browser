import { App, AppTab } from 'types'

export const getKeyForApps = (apps: Array<AppTab | App> = []) =>
  apps.map((id) => id).join(',')

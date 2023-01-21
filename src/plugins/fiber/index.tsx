import { type Plugin } from '../types'

import * as api from './components'

export const name = 'fb'

export const fiber: Plugin = {
  name,
  examples: {},
  api,
}

import { stringify } from 'yaml'
import { Settings } from '../../types'

import { getLayout } from '../templates'
import { Instructions } from './types'

export const derivatePrompt = (input: string) =>
  `Transform the following YAML document by improving the values.
  It should have 5x more textual content.
${input || ''}`

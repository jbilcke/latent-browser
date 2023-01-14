import { stringify } from 'yaml'
import { Settings } from '../../types'
import { Scene, Specification } from './types'

export const getImproverPrompt = (
  spec: Specification,
  scene?: Scene,
  settings?: Settings
) =>
  `Transform the following YAML document by improving the values.
It should have at least 5x more textual content for paragraphs (more detailed and descriptive).
It must not be in Latin.
${settings?.customPlannerPrompt || ''}
${stringify(scene || [])}
`

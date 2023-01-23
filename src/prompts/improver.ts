import { Settings } from '../types'
import { Specification } from './types'

export const getImproverPrompt = (
  spec: Specification,
  original: string,
  settings?: Settings
) =>
  `Transform the following YAML document by improving the paragraph.
It should have at least 5x more textual content for paragraphs (more detailed and descriptive).
If it is written in Latin, then re-write everything to English!
\`\`\`yaml
${original}
\`\`\`
${settings?.customPlannerPrompt || ''}
YAML whose paragraphs are much longer and beautifully written, but are still in phase with the following instructions:
${Object.entries(spec)
  .filter(([k, v]) => v?.length)
  // temporary hack until we can figure out what to do with the rest
  .filter(([k, v]) => k === 'content' || k === 'summary')
  .map(([k, v]) => `- ${k}: ${v.join('. ')}`)
  .join('\n')}
\`\`\`yaml
`

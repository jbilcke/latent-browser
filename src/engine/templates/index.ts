import { contents } from './contents'
import { headers } from './headers'
import { layouts } from './layouts'
import { build } from './ai-design-system'

const templates = build(layouts)
export const getLayout = templates.template
export const getLayouts = templates.templates

const subTemplates = build([...headers, ...contents])
export const getSubLayout = subTemplates.template
export const getSubLayouts = subTemplates.templates

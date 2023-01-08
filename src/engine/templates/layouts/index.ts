import { JSXTemplate } from '../ai-design-system'

import { appLayout } from './app'
import { articleLayout } from './article'
import { blogLayout } from './blog'
import { gameLayout } from './game'
import { libraryLayout } from './library'
import { defaultLayout } from './default'

export const layouts = [
  defaultLayout,
  appLayout,
  articleLayout,
  blogLayout,
  gameLayout,
  libraryLayout,
] as JSXTemplate[]

import { type Plugin } from '../types'

import * as api from './components'

export const name = 'pf'

const examples = {
  'a one page book called "The Test" written by an anonymous developer, with two test paragraphs':
    {
      'pf.pdf': [
        { 'pf.h1': 'The Test' },
        { 'pf.author': 'Anonymous Developer' },
        { 'pf.h3': 'Hello' },
        { 'pf.p': 'Hello. This is a test.' },
        { 'pf.h3': 'World' },
        { 'pf.p': 'Hello, World!' },
      ],
    },
}

export const pdf: Plugin = {
  name,
  examples,
  api,
}

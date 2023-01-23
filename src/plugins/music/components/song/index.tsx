import { Song } from 'reactronica'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const song: Component = {
  component: Song,
  doc: 'song',
  params: {
    a: {
      doc: 'should we auto-start the music or not',
      prop: 'isPlaying',
      values: toggle,
    },
    b: {
      doc: 'BPM (beats per minute)',
    },
  },
  allowedChildren: 'mu',
}

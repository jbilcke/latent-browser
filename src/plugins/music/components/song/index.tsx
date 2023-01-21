import { Song } from 'reactronica'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const song: Component = {
  component: Song,
  doc: 'song',
  params: {
    autoplay: {
      doc: 'should we auto-start the music or not',
      prop: 'isPlaying',
      values: toggle,
    },
    bpm: {
      doc: 'beats per minute (eg. 90, 120..)',
    },
  },
  allowedChildren: 'mu',
}

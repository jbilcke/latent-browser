import { Song } from 'reactronica'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const song: Component = {
  component: Song,
  description: 'song',
  params: {
    autoplay: {
      description: 'should we auto-start the music or not',
      prop: 'isPlaying',
      values: toggle,
    },
    bpm: {
      description: 'beats per minute (eg. 90, 120..)',
    },
  },
  allowedChildren: 'mu',
}

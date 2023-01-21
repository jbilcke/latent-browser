import { Song, Track, Instrument } from 'reactronica'
import { toggle } from '../common'
import { type Plugin } from '../types'

export const name = 'mu'

export const music: Plugin = {
  name,
  examples: {},
  api: {
    song: {
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
      allowedChildren: 'music',
    },
    track: {
      component: Track,
      description: 'a track contains instruments',
      allowedParents: 'music',
      allowedChildren: 'music',
      params: {
        steps: {
          description: 'array of musical steps like C3, E3, B2, E3 etc',
        },
      },
    },
    instrument: {
      component: Instrument,
      description: 'an instrument',
      allowedParents: 'music',
      allowedChildren: null,
      params: {
        type: {
          description: 'instrument type',
          values: ['synth'],
        },
      },
    },
  },
}

import { memo } from 'react'
import { type Component } from '../../../types'

import { Sphere } from '../../primitives/Sphere'

const Ball = ({ color = 'orange', size = 0.5, sparkles = false }) => (
  <Sphere
    color={color}
    amount={30}
    emissive={color}
    glow={color}
    size={size}
    sparkles={sparkles}
    position={[
      size,
      size, // height (must be linked to the size)
      size,
    ]}
  />
)

export const ball: Component = {
  component: memo(Ball),
  doc: '3D ball or sphere',
  allowedParents: 'fb',
  allowedChildren: 'fb',
  params: {
    c: {
      prop: 'color',
      doc: 'HEX color',
    },
    s: {
      prop: 'size',
      doc: 'size',
      values: ['between 0.5 and 2.0'],
    },
  },
}

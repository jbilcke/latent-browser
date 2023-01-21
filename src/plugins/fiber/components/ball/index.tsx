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
      Math.random() * 4 - 2,
      size, // height (must be linked to the size)
      Math.random() * 4 - 2,
    ]}
  />
)

export const ball: Component = {
  component: Ball,
  description: '3D ball or sphere',
  allowedParents: 'fb',
  allowedChildren: 'fb',
  params: {
    color: {
      description: 'HEX color',
    },
    size: {
      description: 'float (between 0.5 and 2.0)',
    },
  },
}

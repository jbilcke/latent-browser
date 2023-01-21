import { type Component } from '../../../types'

const Box = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
)

export const box: Component = {
  component: Box,
  doc: '3D box or cube',
  allowedParents: 'fb',
  allowedChildren: 'fb',
}

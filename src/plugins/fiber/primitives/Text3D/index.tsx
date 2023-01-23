import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'
import { Text3D } from '@react-three/drei'

import { Component } from '~/plugins/types'

import font from './fonts/Corben/Corben_Bold.json'

const textOptions = {}

const Text = ({ children }: { children?: ReactNode }) => (
  <Text3D font={font as any} {...textOptions}>
    {onlyText(children)}
    <meshNormalMaterial />
  </Text3D>
)

export const text3D: Component = {
  component: Text,
  doc: 'some text',
}

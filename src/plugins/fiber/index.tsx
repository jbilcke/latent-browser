import { ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  BakeShadows,
  OrbitControls,
} from '@react-three/drei'

import { type Plugin } from '../types'
import { Sphere } from './primitives'

// to find environments:
// https://polyhaven.com/hdris

const envHDR = '/kits/fiber/hdr/evening_road_01_2k.hdr'

export const Box = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
)

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

export const Scene = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 30 }}>
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          files={envHDR}
          ground={{ height: 5, radius: 40, scale: 20 }}
        />
        {children}
        <ContactShadows
          renderOrder={2}
          color="black"
          resolution={1024}
          frames={1}
          scale={10}
          blur={1.5}
          opacity={0.65}
          far={0.5}
        />
        <BakeShadows />
        <OrbitControls
          autoRotateSpeed={0.85}
          zoomSpeed={0.75}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.55}
        />
      </Canvas>
    </div>
  )
}

export const name = 'fiber'

export const fiber: Plugin = {
  name,
  examples: {},

  api: {
    Scene: {
      component: Scene,
      description:
        "root of the webgl scene, used for 3D apps and games (allowed children: 'fiber.*')",
      allowedChildren: 'fiber',
    },
    Ball: {
      component: Ball,
      description: '3D ball or sphere',
      allowedParents: 'fiber',
      allowedChildren: 'fiber',
      params: {
        color: {
          description: 'color (in HEX)',
        },
        size: {
          description: 'float (between 0.5 and 2.0)',
        },
      },
    },
    Box: {
      component: Box,
      description: '3D box or cube',
      allowedParents: 'fiber',
      allowedChildren: 'fiber',
    },
  },
}

import * as THREE from 'three'
import {
  Sparkles,
  Shadow,
  Billboard,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'

// to find environments:
// https://polyhaven.com/hdris
export const envHDR = '/kits/fiber/hdr/evening_road_01_2k.hdr'

export const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  <Billboard>
    <mesh>
      <circleGeometry args={[2 * scale, 16]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}
      >
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="normal"
          near={near * scale}
          far={far * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="add"
          near={-40 * scale}
          far={far * 1.2 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-15 * scale}
          far={far * 0.7 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-10 * scale}
          far={far * 0.68 * scale}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
    </mesh>
  </Billboard>
)

export const Sphere = ({
  size = 1,
  amount = 50,
  color = 'white',
  sparkles = false,
  emissive,
  glow,
  ...props
}) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial
      roughness={0}
      color={color}
      emissive={emissive || color}
      envMapIntensity={0.2}
    />
    <Glow scale={size * 1.2} near={-25} color={glow || emissive || color} />
    {sparkles ? (
      <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} />
    ) : undefined}
    <Shadow
      rotation={[-Math.PI / 2, 0, 0]}
      scale={size}
      position={[0, -size, 0]}
      color={emissive}
      opacity={0.5}
    />
  </mesh>
)

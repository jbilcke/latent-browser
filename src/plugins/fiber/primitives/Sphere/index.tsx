import { Sparkles, Shadow } from '@react-three/drei'

import { Glow } from '../Glow'

// to find environments:
// https://polyhaven.com/hdris
export const envHDR = '/kits/fiber/hdr/evening_road_01_2k.hdr'

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

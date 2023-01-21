import { BakeShadows, ContactShadows } from '@react-three/drei'

export const Shadows = () => (
  <>
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
  </>
)

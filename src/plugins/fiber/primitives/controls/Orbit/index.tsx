import { OrbitControls } from '@react-three/drei'

export const Orbit = () => (
  <OrbitControls
    autoRotateSpeed={0.85}
    zoomSpeed={0.75}
    minPolarAngle={Math.PI / 2.5}
    maxPolarAngle={Math.PI / 2.55}
  />
)

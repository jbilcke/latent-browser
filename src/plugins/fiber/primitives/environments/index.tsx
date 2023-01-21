import { Environment } from '@react-three/drei'

// to find environments:
// https://polyhaven.com/hdris
export const envHDR = '/kits/fiber/hdr/evening_road_01_2k.hdr'

export const Environment1 = () => (
  <>
    <hemisphereLight intensity={0.5} color="white" groundColor="black" />
    <Environment files={envHDR} ground={{ height: 5, radius: 40, scale: 20 }} />
  </>
)

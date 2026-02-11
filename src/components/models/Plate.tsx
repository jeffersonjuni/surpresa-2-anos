import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

export function Plate(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/plates.glb");

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/plates.glb");

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

export function Pizza(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/pizza.glb");

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/pizza.glb");

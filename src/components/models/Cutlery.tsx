import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

export function Cutlery(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/cutlery.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new MeshStandardMaterial({
          color: "#f2f2f2",      // branco/prata
          metalness: 0.9,        // aspecto metálico
          roughness: 0.25,       // brilho controlado
        });
      }
    });
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/cutlery.glb");

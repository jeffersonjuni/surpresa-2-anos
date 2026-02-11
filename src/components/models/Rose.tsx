import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MeshStandardMaterial } from "three";

type RoseProps = {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

export function Rose({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: RoseProps) {
  const roseRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/rose.glb");

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const material = mesh.material as MeshStandardMaterial;

        if (material.emissive) {
          material.emissiveIntensity =
            0.2 + Math.sin(time * 1.2) * 0.08;
        }
      }
    });
  });

  return (
    <group
      ref={roseRef}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/rose.glb");

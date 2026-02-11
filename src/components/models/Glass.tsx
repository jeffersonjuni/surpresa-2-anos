import type React from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

export function Glass(props: React.ComponentPropsWithoutRef<"group">) {
  const gltf = useGLTF("/models/red_wine.glb") as GLTF;

  // apenas renderiza o GLB como está, mantendo cores e materiais originais
  return <primitive object={gltf.scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/red_wine.glb");

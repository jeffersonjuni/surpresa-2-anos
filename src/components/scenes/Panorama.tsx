import { useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide } from "three";

export function Panorama() {
  const texture = useLoader(
    TextureLoader,
    "/textures/panorica_360_extrema_sombra_V1.jpg"
  );

  return (
    <mesh>
      {/* Esfera grande */}
      <sphereGeometry args={[50, 64, 64]} />

      {/* Material por dentro */}
      <meshBasicMaterial
        map={texture}
        side={BackSide}
      />
    </mesh>
  );
}

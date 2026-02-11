import { useTexture } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type PhotoFrameProps = ThreeElements["group"] & {
  onClick: () => void;
};

export function PhotoFrame({ onClick, ...props }: PhotoFrameProps) {
  const texture = useTexture("/images/photo-2-anos.png");

  return (
    <group {...props}>
      {/* HITBOX INVISÍVEL */}
      <mesh onClick={onClick}>
        <boxGeometry args={[1.9, 1.8, 0.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* COSTAS DO QUADRO */}
      <mesh position={[0, 0, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 1.55, 0.06]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.85} />
      </mesh>

      {/* PEZINHO DE APOIO (INCLINADO) */}
      <mesh
        position={[0, -0.6, -0.55]}
        rotation={[Math.PI / 4, 0, 0]} // inclinação realista
        castShadow
      >
        <boxGeometry args={[0.25, 1.2, 0.06]} />
        <meshStandardMaterial
          color="#3a2a1a"
          roughness={0.9}
        />
      </mesh>

      {/* MOLDURA */}
      <mesh position={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[1.7, 1.6, 0.1]} />
        <meshStandardMaterial
          color="#6b4f3a"
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* PASSE-PARTOUT */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.55, 1.45, 0.04]} />
        <meshStandardMaterial color="#f4f1ec" roughness={0.9} />
      </mesh>

      {/* FOTO */}
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[1.45, 1.35, 0.015]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

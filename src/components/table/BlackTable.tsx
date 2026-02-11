import type { ThreeElements } from "@react-three/fiber";

type DrumTableProps = ThreeElements["mesh"];

export function DrumTable(props: DrumTableProps) {
  return (
    <mesh {...props} castShadow receiveShadow position={[0, -0.6, 0]}>
      <cylinderGeometry args={[3.4, 3.2, 4.2, 64]} />

      <meshStandardMaterial color="#292828" roughness={0.7} metalness={0.35} />
    </mesh>
  );
}

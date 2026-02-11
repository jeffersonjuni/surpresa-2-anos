import { Glass } from "./models/Glass";

export function TwoGlasses() {
  return (
    <group position={[2.3, 1.36, 0.5]} scale={0.2}>
      <Glass />
    </group>
  );
}

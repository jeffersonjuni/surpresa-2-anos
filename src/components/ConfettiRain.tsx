import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConfettiRain() {
  const group = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);

  // ⏳ Espera 3 segundos antes de aparecer
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const confetti = useMemo(() => {
    const items = [];
    for (let i = 0; i < 120; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 6,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 4 - 2,
        ],
        color: new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`),
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return items;
  }, []);

  useFrame(() => {
    if (!group.current || !visible) return;

    group.current.children.forEach((child, index) => {
      child.position.y -= confetti[index].speed;

      if (child.position.y < 0.5) {
        child.position.y = Math.random() * 5 + 2;
      }

      child.rotation.x += 0.02;
      child.rotation.y += 0.02;
    });
  });

  if (!visible) return null;

  return (
    <group ref={group}>
      {confetti.map((item, i) => (
        <mesh key={i} position={item.position as any}>
          <boxGeometry args={[0.1, 0.05, 0.02]} />
          <meshStandardMaterial color={item.color} />
        </mesh>
      ))}
    </group>
  );
}

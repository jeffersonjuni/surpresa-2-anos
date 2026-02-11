import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef, Suspense } from "react";
import gsap from "gsap";
import { DrumTable } from "../table/BlackTable";
import { Pizza } from "../models/Pizza";
import { TwoGlasses } from "../TwoGlasses";
import { Rose } from "../models/Rose";
import { Panorama } from "./Panorama";
import { PhotoFrame } from "../PhotoFrame";
import { Plate } from "../models/Plate";
import { Cutlery } from "../models/Cutlery";
import { ConfettiRain } from "../ConfettiRain";


/* =========================
   POSIÇÕES DA CÂMERA
========================= */
const CAMERA_START = { x: 0, y: 3.2, z: 6 };
const CAMERA_DEFAULT = { x: 0, y: 4.6, z: 7 };

// chega BEM perto do retrato
const CAMERA_FOCUS = { x: 0, y: 2.4, z: -0.3 };

/* =========================
   ANIMAÇÃO INICIAL
========================= */
function CameraAnimation({
  onFinish,
  controlsRef,
}: {
  onFinish: () => void;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const hasAnimated = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (hasAnimated.current || !controlsRef.current) return;
    hasAnimated.current = true;

    camera.position.set(CAMERA_START.x, CAMERA_START.y, CAMERA_START.z);

    // 👉 libera controles quase imediatamente
    setTimeout(onFinish, 600);

    tweenRef.current = gsap.to(camera.position, {
      ...CAMERA_DEFAULT,
      duration: 2.8,
      ease: "power3.out",
      onUpdate: () => {
        controlsRef.current.target.set(0, 2, 0);
        controlsRef.current.update();
      },
    });

    // 👉 se o usuário mexer o mouse, cancela animação
    const cancelOnUserInput = () => {
      tweenRef.current?.kill();
    };

    controlsRef.current.addEventListener("start", cancelOnUserInput);

    return () => {
      controlsRef.current?.removeEventListener("start", cancelOnUserInput);
    };
  }, [camera, onFinish, controlsRef]);

  return null;
}

/* =========================
   CONTROLES
========================= */
function Controls({
  enabled,
  focused,
  controlsRef,
}: {
  enabled: boolean;
  focused: boolean;
  controlsRef: React.MutableRefObject<any>;
}) {
  return (
    <OrbitControls
      ref={controlsRef}
      enabled={enabled}
      enablePan={false}
      target={[0, 2, 0]}
      minDistance={focused ? 1.2 : 6.5} // 🔥 CHAVE DA SOLUÇÃO
      maxDistance={focused ? 3 : 10}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.9}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

/* =========================
   FOCO NO PORTA-RETRATO
========================= */
function CameraFocus({
  focused,
  enabled,
  controlsRef,
}: {
  focused: boolean;
  enabled: boolean;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    if (!enabled || !controlsRef.current) return;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controlsRef.current.target);

    const pos = focused ? CAMERA_FOCUS : CAMERA_DEFAULT;

    const target = focused
      ? { x: 0, y: 2.4, z: -2 } // retrato
      : { x: 0, y: 2, z: 0 }; // mesa ✅

    controlsRef.current.enabled = false;

    gsap.to(camera.position, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration: focused ? 4.2 : 3.6,
      ease: "power2.inOut",
    });

    gsap.to(controlsRef.current.target, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: focused ? 4.2 : 3.6,
      ease: "power2.inOut",
      onUpdate: () => controlsRef.current.update(),
      onComplete: () => {
        controlsRef.current.enabled = true;
      },
    });
  }, [focused, enabled, camera, controlsRef]);

  return null;
}

/* =========================
   MARCA CENA PRONTA
========================= */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

/* =========================
   CENA PRINCIPAL
========================= */
export default function SceneIntro3D() {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [focusedOnFrame, setFocusedOnFrame] = useState(false);

  const controlsRef = useRef<any>(null);

  return (
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault fov={75} />

      <Suspense fallback={null}>
        {/* MODELOS */}
        <DrumTable position={[0, 1.1, 0]} receiveShadow castShadow />
        <Pizza position={[0, 0.8, 0]} scale={3} />
        <TwoGlasses />
        <Rose
          position={[-2.2, 1.6, 1]}
          scale={3.5}
          rotation={[Math.PI / 2, 0, Math.PI]}
        />

        <SceneReady onReady={() => setSceneReady(true)} />
      </Suspense>

      {/* CÂMERA */}
      {sceneReady && (
        <>
          <CameraAnimation
            onFinish={() => setControlsEnabled(true)}
            controlsRef={controlsRef}
          />

          <CameraFocus
            focused={focusedOnFrame}
            enabled={controlsEnabled}
            controlsRef={controlsRef}
          />
        </>
      )}

      {/* CONTROLES */}
      <Controls
        enabled={controlsEnabled}
        focused={focusedOnFrame}
        controlsRef={controlsRef}
      />

      {/* LUZES */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} />

      {/* PANORAMA */}
      <Panorama />

      {/* PORTA-RETRATO */}
      <PhotoFrame
        position={[0, 2.3, -2]}
        rotation={[-0.08, 0, 0]}
        onClick={() => setFocusedOnFrame((prev) => !prev)}
      />
      {focusedOnFrame && <ConfettiRain />}

      {/* PRATOS */}
      <Plate position={[-1.4, 1.35, 2.54]} scale={0.006} />

      {/* TALHERES */}
      <Cutlery
        position={[-0.95, 1.52, 2]}
        rotation={[-Math.PI, -0.5 + Math.PI, 0]}
        scale={0.090}
      />
    </Canvas>
  );
}

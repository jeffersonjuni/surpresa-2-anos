import { useState } from "react";
import Terminal from "./components/terminal/Terminal";
import SceneIntro3D from "./components/scenes/SceneIntro3D";
import { BackgroundMusic } from "./components/BackgroundMusic";

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  return (
    <>
      {/* Música global */}
      <BackgroundMusic start={musicStarted} />

      {showTerminal && (
        <Terminal
          onFinish={() => {
            setShowTerminal(false);
            setMusicStarted(true); // 🎵 começa aqui
          }}
        />
      )}

      {!showTerminal && <SceneIntro3D />}
    </>
  );
}

export default App;

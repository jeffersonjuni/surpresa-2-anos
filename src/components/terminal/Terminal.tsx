import { useEffect, useState } from "react";
import "./terminal.css";

interface TerminalProps {
  onFinish: () => void;
}

const messages: string[] = [
  "> Inicializando sistema...",
  "> Acessando arquivos confidenciais...",
  "> Memória encontrada: Nosso primeiro dia 30 juntos",
  "> Status: Amor iniciado com sucesso ❤",
  "> Tempo decorrido: 2 anos",
];

const TYPE_SPEED = 40;
const LINE_DELAY = 600;

const Terminal = ({ onFinish }: TerminalProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Digitação
  useEffect(() => {
    if (lineIndex >= messages.length) {
      setIsFinished(true);
      return;
    }

    const currentLine = messages[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentLine.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, TYPE_SPEED);

      return () => clearTimeout(timeout);
    }

    const lineTimeout = setTimeout(() => {
      setLines((prev) => [...prev, currentLine]);
      setCurrentText("");
      setCharIndex(0);
      setLineIndex((prev) => prev + 1);
    }, LINE_DELAY);

    return () => clearTimeout(lineTimeout);
  }, [charIndex, lineIndex]);

  // QUALQUER INTERAÇÃO → fade (desktop + mobile)
  useEffect(() => {
    if (!isFinished) return;

    let hasTriggered = false;

    const triggerFade = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      setFadeOut(true);
      setTimeout(onFinish, 1000);
    };

    window.addEventListener("keydown", triggerFade);
    window.addEventListener("click", triggerFade);
    window.addEventListener("touchstart", triggerFade);

    return () => {
      window.removeEventListener("keydown", triggerFade);
      window.removeEventListener("click", triggerFade);
      window.removeEventListener("touchstart", triggerFade);
    };
  }, [isFinished, onFinish]);

  return (
    <div className={`terminal-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="terminal-content">
        {lines.map((line, index) => (
          <p key={index} className="terminal-line">
            {line}
          </p>
        ))}

        {!isFinished && <p className="terminal-line">{currentText}</p>}

        {isFinished && (
          <p className="terminal-hint">
            <span>Toque na tela ou pressione qualquer tecla</span> para continuar
          </p>
        )}
      </div>
    </div>
  );
};

export default Terminal;

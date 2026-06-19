import { useState, useEffect } from "react";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "strike" | "done">("counting");

  useEffect(() => {
    const duration = 1800;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setPhase("strike");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 400);
        }, 600);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-400 ${
        phase === "strike" ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "hsl(240 14% 2%)" }}
    >
      {/* Counter */}
      <span className="font-mono text-2xl sm:text-3xl tracking-wider" style={{ color: "rgba(232, 232, 237, 0.6)" }}>
        {progress.toFixed(1)}%
      </span>

      {/* Purple strike line */}
      {phase === "strike" && (
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(239 84% 67%), transparent)",
            animation: "counter-strike 0.5s ease-out forwards",
          }}
        />
      )}
    </div>
  );
};

export default PreLoader;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";
import Lantern from "../components/Lantern";

const HOLD_MS = 1800;

export default function GlowScene({ data, onNext }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    if (done) return;
    clearInterval(timer.current);
    const t0 = Date.now();
    timer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - t0) / HOLD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer.current);
        setDone(true);
      }
    }, 30);
  };

  const stop = () => {
    clearInterval(timer.current);
    setProgress((p) => (p >= 100 ? p : 0));
  };

  return (
    <SceneWrapper>
      <p className="mb-6 text-lg font-semibold text-amber-100">
        {done ? "Your lantern is glowing 🏮" : "Press and hold the lantern"}
      </p>

      <div
        className="my-12 touch-none select-none"
        style={{ transform: "scale(1.6)" }}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Lantern glow={done ? 1 : progress / 100} onClick={() => {}} />
      </div>

      {done && (
        <motion.div
          className="mt-4 rounded-3xl bg-white/10 px-6 py-5 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg font-semibold leading-relaxed text-amber-50">
            {data.finalNote}
          </p>
        </motion.div>
      )}

      {done && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
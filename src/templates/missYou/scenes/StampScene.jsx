import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const HOLD_MS = 1200;

export default function StampScene({ data, onNext }) {
  const [progress, setProgress] = useState(0);
  const [sealed, setSealed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    if (sealed) return;
    clearInterval(timer.current);
    const startedAt = Date.now();
    timer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startedAt) / HOLD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer.current);
        setSealed(true);
      }
    }, 30);
  };

  const stop = () => {
    clearInterval(timer.current);
    setProgress((p) => (p >= 100 ? p : 0));
  };

  return (
    <SceneWrapper>
      <p className="mb-6 text-lg font-semibold text-sky-800">
        {sealed
          ? "Sealed with love 💌"
          : "Press and hold the stamp to seal your note"}
      </p>

      <motion.div
        className="relative h-28 w-28 cursor-pointer touch-none select-none"
        animate={{ scale: progress > 0 && !sealed ? 0.92 : 1 }}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="50" fill="none" strokeWidth="6" className="stroke-orange-200" />
          <circle
            cx="56"
            cy="56"
            r="50"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-orange-500"
            strokeDasharray="314"
            strokeDashoffset={314 * (1 - progress / 100)}
          />
        </svg>
        <div className="absolute inset-3 flex items-center justify-center rounded-full bg-orange-500 text-4xl shadow-lg">
          {sealed ? "✅" : "✉️"}
        </div>
      </motion.div>

      <AnimatePresence>
        {sealed && (
          <motion.div
            className="mt-6 w-full overflow-hidden rounded-2xl border-2 border-orange-300 bg-white shadow-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <p className="px-6 py-5 text-lg font-semibold leading-relaxed text-sky-800">
              {data.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {sealed && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
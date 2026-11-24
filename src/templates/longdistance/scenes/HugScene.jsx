import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const HOLD_MS = 1000;

function Person({ name, glow }) {
  return (
    <div className="flex w-24 flex-col items-center">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-2xl font-bold text-white shadow-lg"
        animate={glow ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, repeat: glow ? 2 : 0 }}
      >
        {name.trim().charAt(0).toUpperCase() || "♥"}
      </motion.div>
      <p className="mt-2 text-sm font-semibold text-indigo-100">{name}</p>
    </div>
  );
}

export default function HugScene({ data, onNext }) {
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = (e) => {
    if (sent) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    clearInterval(timer.current);
    const t0 = Date.now();
    timer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - t0) / HOLD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer.current);
        setSent(true);
      }
    }, 30);
  };

  const stop = () => {
    clearInterval(timer.current);
    setProgress((p) => (p >= 100 ? p : 0));
  };

  return (
    <SceneWrapper>
      <p className="mb-8 text-center text-lg font-semibold text-indigo-100">
        {delivered
          ? `${data.receiverName} felt that hug 🤗`
          : "Hold the button to send a hug"}
      </p>

      <div className="relative flex w-full items-start justify-between px-2">
        <Person name={data.senderName} />
        <Person name={data.receiverName} glow={delivered} />

        {sent && (
          <motion.span
            className="absolute top-3 text-3xl"
            initial={{ left: "6%", y: 0 }}
            animate={{ left: ["6%", "84%"], y: [0, -55, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            onAnimationComplete={() => setDelivered(true)}
          >
            ❤️
          </motion.span>
        )}
      </div>

      <div
        role="button"
        aria-label="Hold to send a hug"
        className="relative mt-10 h-14 w-60 cursor-pointer touch-none select-none overflow-hidden rounded-full border border-white/30 bg-white/10"
        onPointerDown={start}
        onPointerUp={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="absolute inset-y-0 left-0 bg-teal-500/70"
          style={{ width: `${progress}%` }}
        />
        <div className="relative flex h-full items-center justify-center font-bold text-indigo-50">
          {sent ? "Hug sent 🤗" : "Send hug 🤗"}
        </div>
      </div>

      {delivered && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
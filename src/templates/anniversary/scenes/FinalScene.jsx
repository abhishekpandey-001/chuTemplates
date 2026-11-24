import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCcw } from "lucide-react";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import Lantern from "../components/Lantern";

const LANTERNS = [
  { left: "6%", delay: 0, dur: 5.5 },
  { left: "22%", delay: 1.4, dur: 6 },
  { left: "40%", delay: 0.6, dur: 5 },
  { left: "56%", delay: 2, dur: 6.2 },
  { left: "72%", delay: 1, dur: 5.4 },
  { left: "86%", delay: 2.4, dur: 5.8 },
];

const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

export default function FinalScene({ data, onReplay }) {
  useEffect(() => {
    const heart = confetti.shapeFromPath({ path: HEART_PATH });
    const opts = {
      shapes: [heart],
      colors: ["#fb7185", "#f43f5e", "#fbbf24"],
      scalar: 2,
      particleCount: 3,
      spread: 70,
    };
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({ ...opts, angle: 60, origin: { x: 0 } });
      confetti({ ...opts, angle: 120, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <SceneWrapper>
      <div className="relative h-44 w-full overflow-hidden">
        {LANTERNS.map((l, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{ left: l.left }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: [40, -200], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: l.dur,
              repeat: Infinity,
              delay: l.delay,
              ease: "easeOut",
            }}
          >
            <div style={{ transform: "scale(0.45)", transformOrigin: "bottom center" }}>
              <Lantern glow={1} delay={i * 0.3} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 rounded-3xl bg-white/10 px-6 py-6 backdrop-blur"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xl font-semibold leading-relaxed text-amber-50">
          {data.finalNote}
        </p>
        <p className="mt-3 font-bold text-rose-300">— {data.senderName}</p>
      </motion.div>

      <motion.button
        onClick={onReplay}
        className="mt-8 flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <RotateCcw size={18} /> Replay
      </motion.button>
    </SceneWrapper>
  );
}
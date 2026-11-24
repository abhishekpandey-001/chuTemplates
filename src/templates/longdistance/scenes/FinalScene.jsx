import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCcw } from "lucide-react";
import SceneWrapper from "../../../shared/components/SceneWrapper";

const COLORS = ["#a5b4fc", "#5eead4", "#fed7aa", "#f9a8d4"];

export default function FinalScene({ data, onReplay }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 }, colors: COLORS });
    const t = setTimeout(
      () =>
        confetti({ particleCount: 60, spread: 110, origin: { y: 0.45 }, colors: COLORS }),
      900
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneWrapper>
      <div className="flex w-full items-center justify-between px-4">
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⭐
        </motion.span>

        <div className="relative mx-3 h-0.5 flex-1">
          <motion.div
            className="absolute inset-0 origin-left bg-gradient-to-r from-orange-200 to-teal-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.5 }}
          />
          <motion.span
            className="absolute -top-4 left-1/2 -ml-3 text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1 }}
          >
            💞
          </motion.span>
        </div>

        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.25, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          ⭐
        </motion.span>
      </div>

      <div className="mt-1 flex w-full justify-between px-2 text-xs font-bold text-orange-200">
        <span>{data.cityA}</span>
        <span>{data.cityB}</span>
      </div>

      <motion.div
        className="mt-6 rounded-3xl bg-white/10 px-6 py-6 backdrop-blur"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xl font-semibold leading-relaxed text-indigo-50">
          {data.message}
        </p>
        <p className="mt-3 font-bold text-orange-200">— {data.senderName}</p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onReplay}
        className="mt-8 flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <RotateCcw size={18} /> Replay
      </motion.button>
    </SceneWrapper>
  );
}
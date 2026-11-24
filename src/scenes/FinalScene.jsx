import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCcw } from "lucide-react";
import SceneWrapper from "../components/SceneWrapper";

export default function FinalScene({ data, onReplay }) {
  useEffect(() => {
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 } });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <SceneWrapper>
      <motion.div
        className="text-8xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        💖
      </motion.div>

      <motion.div
        className="mt-6 rounded-3xl bg-white px-6 py-6 text-xl font-semibold leading-relaxed text-pink-600 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {data.finalMessage}
      </motion.div>

      <motion.button
        onClick={onReplay}
        className="mt-8 flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <RotateCcw size={18} /> Replay
      </motion.button>
    </SceneWrapper>
  );
}
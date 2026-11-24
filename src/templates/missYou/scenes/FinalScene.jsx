import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import SceneWrapper from "../../../shared/components/SceneWrapper";

// 8 points on a circle so the plane flies a smooth loop
const X = [0, 42, 60, 42, 0, -42, -60, -42, 0];
const Y = [-60, -42, 0, 42, 60, 42, 0, -42, -60];
const R = [45, 90, 135, 180, 225, 270, 315, 360, 405];

export default function FinalScene({ data, onReplay }) {
  return (
    <SceneWrapper>
      <div className="relative flex h-44 w-44 items-center justify-center">
        <div className="absolute h-[120px] w-[120px] rounded-full border-2 border-dashed border-orange-300" />
        <motion.span
          className="text-5xl"
          animate={{ x: X, y: Y, rotate: R }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          ✈️
        </motion.span>
      </div>

      <motion.div
        className="mt-4 rounded-3xl bg-white px-6 py-6 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xl font-bold leading-relaxed text-orange-500">
          {data.finalLine}
        </p>
        <p className="mt-3 font-semibold text-sky-700">— {data.senderName}</p>
      </motion.div>

      <motion.button
        onClick={onReplay}
        className="mt-8 flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg"
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
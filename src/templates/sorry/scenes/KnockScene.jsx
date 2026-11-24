import { useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";

export default function KnockScene({ data, onNext }) {
  const [knocked, setKnocked] = useState(false);

  const knock = () => {
    if (knocked) return;
    setKnocked(true);
    setTimeout(onNext, 2000);
  };

  return (
    <SceneWrapper>
      <motion.p
        className="mb-6 text-lg font-semibold text-pink-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hey {data.receiverName}, someone's at your door 💌
      </motion.p>

      <motion.div
        onClick={knock}
        className="relative h-72 w-48 cursor-pointer rounded-t-full border-8 border-pink-300 bg-gradient-to-b from-pink-400 to-rose-500 shadow-2xl"
        animate={
          knocked
            ? { rotate: [0, -3, 3, -3, 3, 0], x: [0, -4, 4, -4, 4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={
          knocked
            ? { duration: 0.6, repeat: 2 }
            : { duration: 2, repeat: Infinity }
        }
        whileHover={{ scale: 1.03 }}
      >
        <div className="absolute right-4 top-1/2 h-4 w-4 rounded-full bg-yellow-200 shadow" />
        <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full border-4 border-pink-200/70" />
      </motion.div>

      <div className="mt-6 h-10">
        {knocked ? (
          <motion.p
            className="text-2xl font-bold text-pink-700"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Knock knock... 🚪
          </motion.p>
        ) : (
          <p className="text-sm text-pink-500">Tap the door to knock</p>
        )}
      </div>
    </SceneWrapper>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";

export default function TeddyScene({ data, onNext }) {
  const [entering, setEntering] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const letIn = () => {
    setEntering(true);
    setTimeout(onNext, 1500);
  };

  const dodge = () =>
    setNoPos({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 120,
    });

  return (
    <SceneWrapper>
      <motion.div
        className="text-9xl"
        initial={{ x: -300, opacity: 0 }}
        animate={
          entering
            ? { x: 0, scale: 1.3, y: [0, -20, 0, -20, 0] }
            : { x: 0, opacity: 1, rotate: [0, -5, 5, 0] }
        }
        transition={
          entering
            ? { duration: 1.2 }
            : { duration: 1, rotate: { duration: 2, repeat: Infinity } }
        }
      >
        🧸
      </motion.div>

      <motion.div
        className="mt-6 rounded-2xl bg-white px-6 py-4 text-xl font-semibold text-pink-600 shadow-lg"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        {entering ? "Yayyy, thank you! 🥹" : data.teddyAsk}
      </motion.div>

      {!entering && (
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={letIn}
            className="rounded-full bg-pink-500 px-8 py-3 font-bold text-white shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes 💖
          </motion.button>

          <motion.button
            onMouseEnter={dodge}
            onClick={dodge}
            className="rounded-full bg-white px-8 py-3 font-bold text-pink-400 shadow"
            animate={noPos}
            transition={{ type: "spring", stiffness: 300 }}
          >
            No
          </motion.button>
        </motion.div>
      )}
    </SceneWrapper>
  );
}
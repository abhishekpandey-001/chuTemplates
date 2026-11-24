import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "../components/SceneWrapper";
import NextButton from "../components/NextButton";

const MAX = 4;
const stages = ["🌱", "🌱", "🌿", "🌿", "🌷"];

export default function PlantScene({ data, onNext }) {
  const [water, setWater] = useState(0);
  const [pouring, setPouring] = useState(false);
  const grown = water >= MAX;

  const pour = () => {
    if (pouring || grown) return;
    setPouring(true);
    setTimeout(() => {
      setWater((w) => w + 1);
      setPouring(false);
    }, 900);
  };

  return (
    <SceneWrapper>
      <p className="mb-6 text-lg font-bold text-pink-600">{data.plantPrompt}</p>

      <div className="relative flex h-64 w-full items-end justify-center">
        <motion.button
          onClick={pour}
          className="absolute left-2 top-0 text-7xl"
          animate={pouring ? { rotate: -35, x: 40, y: 20 } : { rotate: 0, x: 0, y: 0 }}
          whileTap={{ scale: 0.9 }}
        >
          🫖
        </motion.button>

        {pouring &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: "38%", top: 50 }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 120, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: 1 }}
            >
              💧
            </motion.span>
          ))}

        <div className="flex flex-col items-center">
          <motion.div
            className="origin-bottom"
            animate={{ scale: 0.7 + water * 0.4 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <span className="text-7xl">{stages[water]}</span>
          </motion.div>
          <div className="h-10 w-24 rounded-b-2xl bg-amber-700 shadow-lg" />
        </div>
      </div>

      {!grown && (
        <p className="mt-4 text-sm text-pink-500">
          Tap the kettle ({water}/{MAX})
        </p>
      )}

      <AnimatePresence>
        {grown && (
          <motion.div
            className="mt-6 rounded-3xl bg-white px-6 py-4 text-lg font-semibold text-pink-600 shadow-xl"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            {data.plantMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {grown && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
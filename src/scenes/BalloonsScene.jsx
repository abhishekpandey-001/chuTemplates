import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "../components/SceneWrapper";
import NextButton from "../components/NextButton";

const colors = [
  "bg-pink-400",
  "bg-rose-400",
  "bg-fuchsia-400",
  "bg-pink-300",
  "bg-red-300",
  "bg-rose-300",
  "bg-fuchsia-300",
];

export default function BalloonsScene({ data, onNext }) {
  const [popped, setPopped] = useState([]);
  const [current, setCurrent] = useState(null);

  const balloons = [
    ...data.photos.map((src, i) => ({ id: `p${i}`, type: "photo", src })),
    ...data.balloonMessages.map((text, i) => ({ id: `m${i}`, type: "msg", text })),
  ];

  const pop = (b) => {
    if (!popped.includes(b.id)) setPopped((p) => [...p, b.id]);
    setCurrent(b);
  };

  const allPopped = popped.length === balloons.length;

  return (
    <SceneWrapper>
      <p className="mb-4 text-lg font-bold text-pink-600">
        Tap the balloons 🎈
      </p>

      <div className="flex max-w-sm flex-wrap items-end justify-center gap-4">
        {balloons.map((b, i) => (
          <motion.button
            key={b.id}
            onClick={() => pop(b)}
            className="flex flex-col items-center"
            initial={{ y: 200, opacity: 0 }}
            animate={{
              y: popped.includes(b.id) ? [0, -8, 0] : [0, -12, 0],
              opacity: 1,
            }}
            transition={{
              opacity: { delay: i * 0.15 },
              y: { duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15 },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`h-16 w-14 rounded-full shadow-lg ${colors[i % colors.length]} ${
                popped.includes(b.id) ? "opacity-40" : ""
              }`}
              style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
            />
            <div className="h-6 w-px bg-pink-400" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            className="mt-6 w-full rounded-3xl bg-white p-4 shadow-xl"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {current.type === "photo" ? (
              <img
                src={current.src}
                alt="memory"
                className="mx-auto h-48 w-48 rounded-2xl object-cover"
              />
            ) : (
              <p className="text-lg font-semibold text-pink-600">{current.text}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {allPopped && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
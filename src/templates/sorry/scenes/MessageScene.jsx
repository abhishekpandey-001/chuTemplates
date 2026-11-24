import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

export default function MessageScene({ data, onNext }) {
  const [typed, setTyped] = useState("");
  const full = data.teddyMessage;
  const done = typed.length === full.length;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, [full]);

  return (
    <SceneWrapper>
      <motion.div
        className="text-8xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        🧸
      </motion.div>

      <motion.div
        className="relative mt-6 min-h-[130px] rounded-3xl bg-white px-6 py-5 text-lg font-semibold leading-relaxed text-pink-600 shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
        {typed}
        {!done && <span className="animate-pulse">|</span>}
      </motion.div>

      {done && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
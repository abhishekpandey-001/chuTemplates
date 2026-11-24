import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

export default function EnvelopeScene({ data, onNext }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <SceneWrapper>
      <motion.p
        className="mb-16 text-lg font-semibold text-sky-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {data.receiverName}, you have mail from {data.senderName} 💌
      </motion.p>

      <motion.div
        onClick={() => setOpen(true)}
        className="relative h-40 w-64 cursor-pointer"
        animate={open ? { y: 0 } : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2, repeat: Infinity }}
        whileHover={open ? {} : { scale: 1.04 }}
      >
        <div className="absolute inset-0 rounded-xl bg-orange-300 shadow-xl" />

        <div
          className="absolute inset-0 rounded-xl bg-orange-400"
          style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 h-[55%] origin-top bg-orange-500"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformPerspective: 600,
          }}
          animate={{ rotateX: open ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.span
          className="absolute left-1/2 top-[38%] -ml-3 text-2xl"
          animate={{ opacity: open ? 0 : 1 }}
        >
          ❤️
        </motion.span>

        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
          <motion.span
            className="text-5xl"
            initial={{ opacity: 0 }}
            animate={
              open
                ? { opacity: 1, y: -90, x: 30, rotate: -15, scale: 1.4 }
                : { opacity: 0 }
            }
            transition={{ duration: 1.1, delay: 0.5 }}
          >
            ✈️
          </motion.span>
        </div>
      </motion.div>

      <div className="mt-8 min-h-[3rem]">
        {!open && <p className="text-sm text-sky-600">Tap the envelope</p>}
        {ready && (
          <motion.p
            className="text-2xl font-bold text-orange-500"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            A note flew to you.
          </motion.p>
        )}
      </div>

      {ready && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
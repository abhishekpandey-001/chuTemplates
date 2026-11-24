import { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const START = 90;
const HEART = "M50 86 L12 48 C2 36 4 8 28 8 C40 8 47 15 50 22 C53 15 60 8 72 8 C96 8 98 36 88 48 Z";

function Half({ side, x, joined, onEnd }) {
  const left = side === "left";
  return (
    <motion.div
      className="absolute top-0 left-1/2 cursor-grab touch-none"
      drag={joined ? false : "x"}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={left ? { left: -START, right: 0 } : { left: 0, right: START }}
      style={{ x, marginLeft: left ? -56 : 0 }}
      onDragEnd={onEnd}
    >
      <svg
        viewBox={left ? "0 0 50 90" : "50 0 50 90"}
        width="56"
        height="101"
        className="pointer-events-none"
      >
        <path d={HEART} fill={left ? "#f43f5e" : "#fb7185"} />
      </svg>
    </motion.div>
  );
}

export default function HeartsScene({ data, onNext }) {
  const xl = useMotionValue(-START);
  const xr = useMotionValue(START);
  const [joined, setJoined] = useState(false);

  const check = () => {
    if (joined) return;
    if (xl.get() > -14 && xr.get() < 14) {
      animate(xl, 0, { type: "spring", stiffness: 300 });
      animate(xr, 0, { type: "spring", stiffness: 300 });
      setJoined(true);
    }
  };

  const years = String(data.years).trim();
  const yearWord = years === "1" ? "year" : "years";

  return (
    <SceneWrapper>
      <p className="mb-8 text-lg font-semibold text-amber-100">
        {joined
          ? `${data.senderName} & ${data.receiverName}`
          : "Drag both halves to the middle"}
      </p>

      <motion.div
        className="relative h-28 w-full"
        animate={joined ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {joined &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-12 -ml-6 h-12 w-12 rounded-full border-2 border-rose-300"
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.25 }}
            />
          ))}
        <Half side="left" x={xl} joined={joined} onEnd={check} />
        <Half side="right" x={xr} joined={joined} onEnd={check} />
      </motion.div>

      <div className="mt-8 min-h-[3.5rem]">
        {joined && (
          <motion.p
            className="text-2xl font-bold text-amber-200"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {years} {yearWord} of us.
          </motion.p>
        )}
      </div>

      {joined && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
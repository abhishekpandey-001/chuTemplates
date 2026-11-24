import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const CLOUDS = [
  { top: "8%", left: "4%", size: "text-8xl" },
  { top: "30%", left: "50%", size: "text-8xl" },
  { top: "48%", left: "8%", size: "text-8xl" },
  { top: "18%", left: "28%", size: "text-9xl" },
  { top: "42%", left: "38%", size: "text-8xl" },
];

function Cloud({ cloud, index, onGone }) {
  const controls = useAnimation();

  const end = (_, info) => {
    if (Math.abs(info.offset.x) > 60) {
      const dir = info.offset.x > 0 ? 1 : -1;
      controls
        .start({ x: dir * 500, opacity: 0, transition: { duration: 0.6 } })
        .then(onGone);
    } else {
      controls.start({ x: 0, transition: { type: "spring" } });
    }
  };

  return (
    <motion.div
      drag="x"
      dragMomentum={false}
      animate={controls}
      onDragEnd={end}
      className={`absolute cursor-grab select-none leading-none ${cloud.size}`}
      style={{ top: cloud.top, left: cloud.left }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity }}
      >
        ☁️
      </motion.div>
    </motion.div>
  );
}

export default function CloudsScene({ data, onNext }) {
  const [gone, setGone] = useState(0);
  const all = gone === CLOUDS.length;

  return (
    <SceneWrapper>
      <p className="mb-4 text-lg font-semibold text-sky-800">
        {all ? "Look who showed up 🌙" : "Swipe the clouds away ☁️"}
      </p>

      <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-700 to-sky-500 shadow-xl">
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-8xl"
          animate={{ opacity: all ? 1 : 0.15, scale: all ? 1.1 : 0.8 }}
          transition={{ duration: 1 }}
          style={{ filter: all ? "drop-shadow(0 0 25px #fde68a)" : "none" }}
        >
          🌙
        </motion.div>

        {CLOUDS.map((c, i) => (
          <Cloud
            key={i}
            cloud={c}
            index={i}
            onGone={() => setGone((g) => g + 1)}
          />
        ))}
      </div>

      {all && (
        <motion.div
          className="mt-5 rounded-2xl bg-white px-5 py-3 font-semibold text-sky-800 shadow-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {data.moonLine}
        </motion.div>
      )}

      {all && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
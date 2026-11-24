import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const PLANE = 56;

export default function GlobeScene({ data, onNext }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const bgX = useTransform(x, (v) => `${-v * 0.8}px`);
  const fillW = useTransform(x, (v) => v + PLANE);
  const [maxX, setMaxX] = useState(240);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setMaxX(Math.max(0, trackRef.current.offsetWidth - PLANE));
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  const end = () => {
    if (x.get() >= maxX * 0.85) {
      animate(x, maxX, { duration: 0.3 });
      setDone(true);
    } else {
      animate(x, 0, { type: "spring", stiffness: 220, damping: 22 });
    }
  };

  return (
    <SceneWrapper>
      <p className="mb-5 text-center text-lg font-semibold text-indigo-100">
        {done
          ? `${data.cityA} → ${data.cityB}, landed safely ✈️`
          : "Swipe the plane across the globe"}
      </p>

      <div className="relative h-52 w-52 overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 shadow-2xl">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.25) 2px, transparent 2px), linear-gradient(0deg, rgba(255,255,255,0.18) 2px, transparent 2px)",
            backgroundSize: "34px 34px",
            backgroundPositionX: bgX,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(30,27,75,0.55) 75%)",
          }}
        />
        {done && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur">
              Landed 🛬
            </span>
          </motion.div>
        )}
      </div>

      <div ref={trackRef} className="relative mt-8 h-14 w-full rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-teal-500/40"
          style={{ width: fillW }}
        />
        <motion.div
          drag={done ? false : "x"}
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          onDragEnd={end}
          whileTap={{ scale: 1.05 }}
          className="absolute left-0 top-0 flex h-14 w-14 cursor-grab touch-none items-center justify-center rounded-full bg-orange-200 text-3xl shadow-lg active:cursor-grabbing"
        >
          ✈️
        </motion.div>
      </div>

      <div className="mt-2 flex w-full justify-between px-2 text-sm font-bold text-orange-200">
        <span>{data.cityA}</span>
        <span>{data.cityB}</span>
      </div>

      {done && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
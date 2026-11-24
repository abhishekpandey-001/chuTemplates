import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

// path in svg coords: M 20 120 Q 150 -20 280 120 (viewBox 300 x 160)
const pointAt = (t) => ({ x: 20 + 260 * t, y: 120 - 280 * t + 280 * t * t });
const angleAt = (t) => (Math.atan2(-280 + 560 * t, 260) * 180) / Math.PI;

export default function MapScene({ data, onNext }) {
  const mapRef = useRef(null);
  const [t, setT] = useState(0);
  const [dragging, setDragging] = useState(false);
  const arrived = t >= 1;
  const p = pointAt(t);

  const update = (e) => {
    const r = mapRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 300;
    const next = Math.min(1, Math.max(0, (px - 20) / 260));
    setT(next >= 0.97 ? 1 : next);
  };

  const down = (e) => {
    if (arrived) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const move = (e) => {
    if (dragging && !arrived) update(e);
  };
  const up = () => setDragging(false);

  return (
    <SceneWrapper>
      <motion.h2
        className="text-3xl font-bold text-sky-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Miles apart…
      </motion.h2>
      <span className="mb-5 mt-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-600">
        {data.distance}
      </span>

      <div className="w-full overflow-hidden rounded-3xl bg-white p-2 shadow-xl">
        <div ref={mapRef} className="relative w-full">
          <svg viewBox="0 0 300 160" className="block w-full">
            <rect width="300" height="160" rx="12" className="fill-sky-100" />
            <ellipse cx="55" cy="125" rx="50" ry="26" className="fill-white" />
            <ellipse cx="240" cy="130" rx="55" ry="24" className="fill-white" />
            <ellipse cx="150" cy="142" rx="35" ry="12" className="fill-white/70" />
            <path
              d="M 20 120 Q 150 -20 280 120"
              fill="none"
              strokeWidth="2.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
              className="stroke-orange-400"
            />
            <circle cx="20" cy="120" r="5" className="fill-orange-500" />
            <circle cx="280" cy="120" r="5" className="fill-orange-500" />
          </svg>

          <div
            className="absolute"
            style={{ left: `${(p.x / 300) * 100}%`, top: `${(p.y / 160) * 100}%` }}
          >
            <div
              className={`-translate-x-1/2 -translate-y-1/2 touch-none select-none p-3 ${
                arrived ? "" : "cursor-grab"
              }`}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
            >
              <span
                className="inline-block text-4xl"
                style={{ transform: `rotate(${angleAt(t) + 45}deg)` }}
              >
                ✈️
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-3 pb-1 pt-1 text-sm font-bold text-sky-800">
          <span>{data.fromCity}</span>
          <span>{data.toCity}</span>
        </div>
      </div>

      <div className="mt-4 min-h-[2rem]">
        {arrived ? (
          <motion.p
            className="text-lg font-bold text-orange-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Still, you're always on my mind 🧡
          </motion.p>
        ) : (
          <p className="text-sm text-sky-600">
            {t === 0 ? `Drag the plane to ${data.toCity}` : "Keep going…"}
          </p>
        )}
      </div>

      {arrived && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
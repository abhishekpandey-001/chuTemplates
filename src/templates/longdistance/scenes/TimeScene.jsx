import { useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const BASE = 21 * 60; // city A at 9:00 PM
const GAP = 330; // city B is 5h30 behind at rest

function fmt(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function Clock({ city, time, aligned }) {
  return (
    <div
      className={`w-36 rounded-2xl bg-white/10 px-3 py-4 text-center backdrop-blur transition ${
        aligned ? "ring-2 ring-teal-300" : ""
      }`}
    >
      <p className="text-sm font-semibold text-orange-200">{city}</p>
      <p className="mt-1 text-2xl font-bold text-indigo-50">{time}</p>
    </div>
  );
}

export default function TimeScene({ data, onNext }) {
  const [v, setV] = useState(0);
  const aligned = v >= 100;

  const timeA = fmt(BASE);
  const timeB = fmt(BASE - GAP * (1 - v / 100));

  return (
    <SceneWrapper>
      <p className="mb-6 text-center text-lg font-semibold text-indigo-100">
        {aligned ? "Right now, we're on the same time ⏰" : "Slide to bring our clocks together"}
      </p>

      <div className="flex items-center justify-center gap-4">
        <Clock city={data.cityA} time={timeA} aligned={aligned} />
        <Clock city={data.cityB} time={timeB} aligned={aligned} />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={v}
        disabled={aligned}
        aria-label="Slide to align both clocks"
        onChange={(e) => {
          const n = Number(e.target.value);
          setV(n >= 98 ? 100 : n);
        }}
        className="mt-10 h-2 w-full cursor-pointer accent-teal-400"
      />

      {!aligned && (
        <p className="mt-3 text-sm font-semibold text-indigo-200">← slide →</p>
      )}

      {aligned && (
        <motion.p
          className="mt-6 text-xl font-bold text-orange-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Different cities, same moment 🧡
        </motion.p>
      )}

      {aligned && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
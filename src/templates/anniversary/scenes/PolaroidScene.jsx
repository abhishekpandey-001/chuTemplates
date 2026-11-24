import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

const TILTS = [-3, 2.5, -1.5];
const GRADS = [
  "from-rose-300 to-amber-200",
  "from-amber-300 to-rose-300",
  "from-rose-200 to-orange-300",
];
const ICONS = ["🌹", "✨", "💞"];

function Card({ i, offset, memory, photo, canSwipe, onSwiped }) {
  const controls = useAnimation();
  const active = offset === 0 && canSwipe;

  const swipe = (dir) =>
    controls
      .start({
        x: dir * 450,
        opacity: 0,
        rotate: dir * 25,
        transition: { duration: 0.35 },
      })
      .then(onSwiped);

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05}) rotate(${TILTS[i % 3]}deg)`,
        transition: "transform 0.3s",
        zIndex: 10 - offset,
      }}
    >
      <motion.div
        className={`h-full w-full overflow-hidden rounded-md bg-white p-3 shadow-2xl ${
          active ? "cursor-grab" : ""
        }`}
        drag={active ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        dragMomentum={false}
        animate={controls}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 80) swipe(info.offset.x > 0 ? 1 : -1);
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt=""
            draggable={false}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-44 w-full items-center justify-center bg-gradient-to-br text-6xl ${GRADS[i % 3]}`}
          >
            {ICONS[i % 3]}
          </div>
        )}
        <p className="mt-3 text-center text-sm font-semibold leading-snug text-slate-700">
          {memory}
        </p>
      </motion.div>
    </div>
  );
}

export default function PolaroidScene({ data, onNext }) {
  const memories = data.memories.slice(0, 3);
  const last = memories.length - 1;
  const [index, setIndex] = useState(0);

  return (
    <SceneWrapper>
      <p className="mb-6 text-lg font-semibold text-amber-100">
        {index < last ? "Swipe through our memories" : "That's us 💕"}
      </p>

      <div className="relative h-72 w-60">
        {memories.map((m, i) =>
          i >= index && i <= index + 2 ? (
            <Card
              key={i}
              i={i}
              offset={i - index}
              memory={m}
              photo={data.photos[i]}
              canSwipe={i < last}
              onSwiped={() => setIndex((n) => n + 1)}
            />
          ) : null
        )}
      </div>

      <p className="mt-6 text-sm text-rose-200">
        {index + 1} / {memories.length}
      </p>

      {index >= last && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
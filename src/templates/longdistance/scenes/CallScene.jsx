import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";

function Dot({ name, city, state, onClick }) {
  const idle = state === "idle";
  const ringing = state === "ringing";

  return (
    <div className="flex w-24 shrink-0 flex-col items-center">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={state === "connected"}
        aria-label={`Call ${name}`}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-2xl shadow-lg"
        animate={
          ringing
            ? { rotate: [0, -12, 12, -12, 12, 0] }
            : idle
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={
          ringing
            ? { duration: 0.6, repeat: Infinity }
            : { duration: 1.8, repeat: idle ? Infinity : 0 }
        }
      >
        {ringing &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border-2 border-teal-300"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.3, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        📱
      </motion.button>
      <p className="mt-2 text-sm font-bold text-indigo-100">{name}</p>
      <p className="text-xs font-semibold text-orange-200">{city}</p>
    </div>
  );
}

export default function CallScene({ data, onNext }) {
  const [state, setState] = useState("idle"); // idle | ringing | connected

  useEffect(() => {
    if (state !== "ringing") return;
    const t = setTimeout(() => setState("connected"), 1800);
    return () => clearTimeout(t);
  }, [state]);

  const call = () => state === "idle" && setState("ringing");
  const connected = state === "connected";

  return (
    <SceneWrapper>
      <p className="mb-8 text-center text-lg font-semibold text-indigo-100">
        {data.receiverName}, {data.senderName} is calling…
      </p>

      <div className="flex w-full items-start justify-between px-2">
        <Dot name={data.senderName} city={data.cityA} state={state} onClick={call} />

        <div className="relative mx-2 mt-8 h-0.5 min-w-0 flex-1 border-t-2 border-dashed border-indigo-300/50">
          <motion.div
            className="absolute -top-0.5 left-0 h-0.5 w-full origin-left bg-teal-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: connected ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <Dot name={data.receiverName} city={data.cityB} state={state} onClick={call} />
      </div>

      <div className="mt-8 min-h-[3.5rem] text-center">
        {state === "idle" && (
          <p className="text-sm text-indigo-200">Tap a phone to call</p>
        )}
        {state === "ringing" && (
          <p className="text-lg font-semibold text-teal-200">Calling…</p>
        )}
        {connected && (
          <motion.p
            className="text-2xl font-bold text-orange-200"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Same sky, different city.
          </motion.p>
        )}
      </div>

      {connected && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
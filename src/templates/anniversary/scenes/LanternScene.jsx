import { useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../../../shared/components/SceneWrapper";
import NextButton from "../../../shared/components/NextButton";
import Lantern from "../components/Lantern";

export default function LanternScene({ data, onNext }) {
  const [lit, setLit] = useState([false, false]);
  const any = lit.some(Boolean);

  const light = (i) => setLit((l) => l.map((v, idx) => (idx === i ? true : v)));

  return (
    <SceneWrapper>
      <p className="mb-8 text-lg font-semibold text-amber-100">
        {data.receiverName}, two lanterns are waiting for you
      </p>

      <div className="flex items-start justify-center gap-14">
        <Lantern glow={lit[0] ? 1 : 0} onClick={() => light(0)} />
        <Lantern glow={lit[1] ? 1 : 0} onClick={() => light(1)} delay={0.8} />
      </div>

      <div className="mt-10 min-h-[3.5rem]">
        {!any ? (
          <p className="text-sm text-rose-200">Tap a lantern to light it</p>
        ) : (
          <motion.p
            className="text-2xl font-bold text-amber-200"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Every year, a new light.
          </motion.p>
        )}
      </div>

      {any && <NextButton onClick={onNext} />}
    </SceneWrapper>
  );
}
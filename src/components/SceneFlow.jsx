import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import KnockScene from "../scenes/KnockScene";
import TeddyScene from "../scenes/TeddyScene";
import MessageScene from "../scenes/MessageScene";
import BalloonsScene from "../scenes/BalloonsScene";
import PlantScene from "../scenes/PlantScene";
import FinalScene from "../scenes/FinalScene";

const scenes = [
  KnockScene,
  TeddyScene,
  MessageScene,
  BalloonsScene,
  PlantScene,
  FinalScene,
];

export default function SceneFlow({ data, startAt = 0 }) {
  const [index, setIndex] = useState(startAt);
  const Scene = scenes[index];

  return (
    <div className="h-full w-full">
      <AnimatePresence mode="wait">
        <Scene
          key={index}
          data={data}
          onNext={() => setIndex((i) => Math.min(i + 1, scenes.length - 1))}
          onReplay={() => setIndex(0)}
        />
      </AnimatePresence>
    </div>
  );
}
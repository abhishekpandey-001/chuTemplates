import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeContext, defaultTheme } from "../ThemeContext";

export default function SceneFlow({ scenes, data, theme, startAt = 0 }) {
  const [index, setIndex] = useState(startAt);
  const Scene = scenes[index];

  return (
    <ThemeContext.Provider value={theme || defaultTheme}>
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
    </ThemeContext.Provider>
  );
}
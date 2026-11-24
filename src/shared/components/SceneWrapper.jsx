import { useMemo, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";

export default function SceneWrapper({ children }) {
  const { bg, floater } = useContext(ThemeContext);

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    []
  );

  return (
    <motion.div
      className={`relative min-h-full w-full overflow-hidden ${bg} flex items-center justify-center p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute top-full pointer-events-none opacity-60"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          animate={{ y: "-120vh" }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {floater}
        </motion.span>
      ))}

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {children}
      </div>
    </motion.div>
  );
}
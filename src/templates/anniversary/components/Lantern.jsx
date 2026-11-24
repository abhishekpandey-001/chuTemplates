import { motion } from "framer-motion";

export default function Lantern({ glow = 0, onClick, sway = true, delay = 0 }) {
  return (
    <motion.div
      onClick={onClick}
      className={`flex flex-col items-center ${onClick ? "cursor-pointer" : ""}`}
      style={{ transformOrigin: "top center" }}
      animate={sway ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
      transition={{ duration: 3, repeat: Infinity, delay }}
      whileTap={onClick ? { scale: 0.95 } : undefined}
    >
      <div className="h-6 w-px bg-amber-200/40" />
      <div className="h-3 w-16 rounded-t-lg bg-rose-800" />
      <div
        className="relative h-24 w-16 overflow-hidden rounded-xl bg-slate-700"
        style={{
          boxShadow: `0 0 ${glow * 50}px ${glow * 12}px rgba(251,191,36,${0.6 * glow})`,
          transition: "box-shadow 0.4s",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-200 via-amber-400 to-rose-400"
          style={{ opacity: glow, transition: "opacity 0.4s" }}
        />
        <div className="absolute inset-y-0 left-1/3 w-px bg-black/15" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-black/15" />
      </div>
      <div className="h-3 w-16 rounded-b-lg bg-rose-800" />
      <div className="h-4 w-1 rounded-b bg-amber-300/50" />
    </motion.div>
  );
}
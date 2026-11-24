import { motion } from "framer-motion";

export default function ProgressBar({ step, total }) {
  const left = total - step - 1;

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm font-semibold text-pink-600">
        <span>
          Step {step + 1} of {total}
        </span>
        <span>{left === 0 ? "Last step!" : `${left} more to go`}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-pink-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
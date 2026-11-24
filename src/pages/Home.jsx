import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Pencil } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 p-4">
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <motion.div
          className="text-7xl"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <h1 className="mt-4 text-2xl font-bold text-pink-600">Sorry Template</h1>
        <p className="mt-2 text-sm text-pink-400">
          A cute interactive way to say sorry. Knock knock, teddy, balloons and a
          little plant that grows.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <motion.button
            onClick={() => navigate("/preview")}
            className="flex items-center justify-center gap-2 rounded-full bg-pink-100 px-6 py-3 font-semibold text-pink-600"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Eye size={18} /> Preview
          </motion.button>

          <motion.button
            onClick={() => navigate("/create")}
            className="flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Pencil size={18} /> Create
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
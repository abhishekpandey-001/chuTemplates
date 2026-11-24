import { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ThemeContext } from "../ThemeContext";

export default function NextButton({ onClick, label = "Next" }) {
  const { accent } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={onClick}
      className={`mt-8 flex items-center gap-2 rounded-full ${accent} px-6 py-3 font-semibold text-white shadow-lg`}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {label} <ArrowRight size={18} />
    </motion.button>
  );
}
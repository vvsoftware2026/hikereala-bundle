import { motion, AnimatePresence } from "framer-motion";

interface TimeBoxProps {
  label: string;
  value: string;
}

export function TimeBox({ label, value }: TimeBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gray-600 rounded-md px-3 py-4 w-full text-center shadow"
        >
          <div className="  text-xl font-mono tabular-nums">{value}</div>
        </motion.div>
      </AnimatePresence>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </div>
  );
}

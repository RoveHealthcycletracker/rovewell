import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-champagne">
          Question {current} of {total}
        </span>
        <span className="text-sm text-champagne/60">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-ivory/10 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-3 bg-gradient-to-r from-mint to-blush rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

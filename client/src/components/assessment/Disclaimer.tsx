import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-300 mb-2">Important Disclaimer</h3>
          <p className="text-champagne/80 text-sm leading-relaxed">
            This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult with a qualified healthcare provider for any questions regarding your health or symptoms. 
            This assessment does not provide a definitive diagnosis and should not be used as the sole basis for health decisions.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

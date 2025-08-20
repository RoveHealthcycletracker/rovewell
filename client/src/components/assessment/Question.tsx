import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionOption {
  value: string;
  label: string;
  points: number;
}

interface QuestionProps {
  question: string;
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  subtitle?: string;
}

export default function Question({ question, options, value, onChange, subtitle }: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold text-ivory mb-3">{question}</h2>
      {subtitle && (
        <p className="text-champagne/70 mb-6 text-sm leading-relaxed">{subtitle}</p>
      )}
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <RadioGroupItem 
              value={option.value} 
              id={option.value}
              className="border-champagne/30 text-blush"
            />
            <Label 
              htmlFor={option.value} 
              className="text-champagne hover:text-ivory cursor-pointer flex-1 py-3 px-4 rounded-xl hover:bg-ivory/5 transition-colors duration-200"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
}

export type { QuestionOption };

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export default function Confetti({ onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#F4C4D4', '#CFE8E5', '#6E3B6E', '#E8B4B8'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3
      });
    }
    
    setParticles(newParticles);
    
    // Clean up after animation completes
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: '-10px'
            }}
            initial={{ 
              y: -100,
              rotate: 0,
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: 720,
              opacity: 0,
              scale: [1, 1.5, 0.5]
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              ease: "easeOut"
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

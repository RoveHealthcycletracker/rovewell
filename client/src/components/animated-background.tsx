import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Animated Grid */}
      <motion.div 
        className="animated-grid absolute inset-0 opacity-20"
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Molecule Lines */}
      <motion.div 
        className="molecule-line top-1/3"
        animate={{ 
          x: [0, 100, 200, 100, 0],
          y: [0, -50, 0, 50, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="molecule-line top-2/3"
        animate={{ 
          x: [0, 100, 200, 100, 0],
          y: [0, -50, 0, 50, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: -7 }}
      />
      
      {/* Floating Particles */}
      <motion.div 
        className="absolute top-20 left-1/4 w-2 h-2 bg-mint rounded-full opacity-60"
        animate={{ 
          y: [0, -20, 10, 0],
          x: [0, 10, -5, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-1/3 w-3 h-3 bg-blush rounded-full opacity-40"
        animate={{ 
          y: [0, -15, 8, 0],
          x: [0, -8, 12, 0],
          rotate: [0, -360]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
      />
      <motion.div 
        className="absolute top-60 left-1/2 w-1 h-1 bg-rose-gold rounded-full opacity-80"
        animate={{ 
          y: [0, -25, 5, 0],
          x: [0, 15, -10, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -4 }}
      />
      <motion.div 
        className="absolute bottom-40 right-1/4 w-2 h-2 bg-mint rounded-full opacity-50"
        animate={{ 
          y: [0, -18, 12, 0],
          x: [0, -12, 6, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />
    </div>
  );
}

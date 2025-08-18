import { motion } from "framer-motion";

interface HeroSectionProps {
  onJoinWaitlist: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onJoinWaitlist, onLearnMore }: HeroSectionProps) {
  return (
    <section id="hero" className="relative z-5 min-h-screen flex items-center justify-center px-6">
      <div className="hero-glow absolute inset-0"></div>
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-ivory via-champagne to-blush bg-clip-text text-transparent">
              Science-Led Care,
            </span>
            <br />
            <span className="bg-gradient-to-r from-mint via-plum to-rose-gold bg-clip-text text-transparent">
              Synced to You.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-champagne/80 mb-8 sm:mb-10 max-w-3xl mx-auto font-light leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Rove combines an intelligent AI cycle coach with clinically reviewed supplements, adapting with you across every phase.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4 max-w-md sm:max-w-none mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={onJoinWaitlist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-plum to-rose-gold hover:from-rose-gold hover:to-plum px-6 sm:px-8 py-4 sm:py-4 rounded-2xl text-ivory font-semibold text-lg shadow-2xl transform transition-all duration-300 animate-pulse-glow w-full sm:w-auto mobile-touch-target"
              data-testid="button-join-waitlist-hero"
            >
              <motion.span 
                className="flex items-center justify-center"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Join Waitlist
                <motion.i 
                  className="fas fa-rocket ml-2 text-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.button>
            
            <motion.button
              onClick={onLearnMore}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(244, 196, 212, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-champagne/30 hover:border-blush/60 bg-transparent px-6 sm:px-8 py-4 sm:py-4 rounded-2xl text-champagne hover:text-ivory font-semibold text-lg transition-all duration-300 backdrop-blur-sm w-full sm:w-auto mobile-touch-target"
              data-testid="button-learn-more"
            >
              <span className="flex items-center justify-center">
                Learn More
                <motion.i 
                  className="fas fa-arrow-down ml-2 text-lg"
                  whileHover={{ y: 5 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating 3D Elements */}
      <motion.div 
        className="absolute top-20 left-10 md:left-20"
        animate={{ y: [0, -20, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-mint/20 to-blush/20 backdrop-blur-sm border border-mint/30 flex items-center justify-center">
          <i className="fas fa-moon text-mint text-2xl"></i>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 md:right-20"
        animate={{ y: [0, -15, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -3 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-plum/20 to-rose-gold/20 backdrop-blur-sm border border-plum/30 flex items-center justify-center">
          <i className="fas fa-heartbeat text-plum text-2xl"></i>
        </div>
      </motion.div>
    </section>
  );
}

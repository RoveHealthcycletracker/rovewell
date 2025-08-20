import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TrustBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const badges = [
    { 
      icon: "fas fa-user-md", 
      text: "Doctor-led", 
      color: "mint",
      description: "Medical expertise",
      gradient: "from-mint/20 to-mint/5"
    },
    { 
      icon: "fas fa-flask", 
      text: "Evidence-aware", 
      color: "blush",
      description: "Science-backed",
      gradient: "from-blush/20 to-blush/5"
    },
    { 
      icon: "fas fa-shield-alt", 
      text: "DPDP-aligned", 
      color: "rose-gold",
      description: "Privacy protected",
      gradient: "from-rose-gold/20 to-rose-gold/5"
    },
    { 
      icon: "fas fa-seedling", 
      text: "India-native", 
      color: "plum",
      description: "Built for India",
      gradient: "from-plum/20 to-plum/5"
    }
  ];

  return (
    <section className="relative z-5 py-4 sm:py-6 px-4 sm:px-6 overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-mint/10 to-transparent rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-blush/10 to-transparent rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-rose-gold/10 to-transparent rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-18 h-18 bg-gradient-to-br from-plum/10 to-transparent rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
      
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-ivory mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Trust & Expertise
          </motion.h2>
          <motion.p 
            className="text-champagne/90 text-lg sm:text-xl mb-4 sm:mb-6 px-4 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Medical background × AI rigor. Privacy-first by design.
          </motion.p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
                <motion.path
                  d="M 25% 50% Q 37.5% 30% 50% 50% Q 62.5% 70% 75% 50%"
                  stroke="url(#trustGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                  transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.5" />
                    <stop offset="25%" stopColor="#FBCFE8" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.5" />
                    <stop offset="75%" stopColor="#C084FC" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {badges.map((badge, index) => (
              <motion.div
                key={badge.text}
                className={`relative group bg-gradient-to-br ${badge.gradient} backdrop-blur-sm border border-${badge.color}/20 rounded-3xl p-4 sm:p-6 hover:border-${badge.color}/40 transition-all duration-500 cursor-pointer overflow-hidden aspect-square flex flex-col justify-center`}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  y: 0
                } : { opacity: 0, scale: 0.8, y: 30 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  boxShadow: `0 20px 40px rgba(110, 59, 110, 0.3)`
                }}
                whileTap={{ scale: 0.98 }}
                data-testid={`badge-${badge.text.toLowerCase().replace('-', '')}`}
              >
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${badge.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon with enhanced styling */}
                <motion.div 
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-${badge.color}/20 to-${badge.color}/10 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:from-${badge.color}/30 group-hover:to-${badge.color}/20 transition-all duration-500`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                >
                  <i className={`${badge.icon} text-xl sm:text-2xl text-${badge.color} group-hover:text-${badge.color} transition-colors duration-500`}></i>
                </motion.div>
                
                {/* Text content */}
                <div className="text-center">
                  <h3 className="text-ivory font-bold text-base sm:text-lg mb-1 group-hover:text-${badge.color} transition-colors duration-500">
                    {badge.text}
                  </h3>
                  <p className={`text-${badge.color}/70 text-xs sm:text-sm font-medium`}>
                    {badge.description}
                  </p>
                </div>
                
                {/* Subtle pulse effect */}
                <motion.div 
                  className={`absolute top-3 right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${badge.color} rounded-full opacity-60`}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Bottom decorative element */}
          <motion.div 
            className="mt-1 sm:mt-2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"></div>
              <motion.div 
                className="w-3 h-3 bg-gradient-to-r from-mint to-blush rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

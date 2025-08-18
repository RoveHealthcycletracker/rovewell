import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TrustBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const badges = [
    { icon: "fas fa-user-md", text: "Doctor-led", color: "mint" },
    { icon: "fas fa-flask", text: "Evidence-aware", color: "blush" },
    { icon: "fas fa-shield-alt", text: "DPDP-aligned", color: "rose-gold" },
    { icon: "fas fa-seedling", text: "India-native", color: "plum" }
  ];

  return (
    <section className="relative z-5 py-12 sm:py-16 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto text-center">
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-champagne/90 text-base sm:text-lg mb-6 sm:mb-8 px-4">
            Medical background × AI rigor. Privacy-first by design.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 px-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.text}
                className={`glass-morphism px-4 sm:px-6 py-2 sm:py-3 rounded-2xl hover:bg-${badge.color}/10 transition-all duration-300 cursor-pointer text-sm sm:text-base`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: [1, 1.02, 1] 
                } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6,
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    delay: -index * 0.5,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 20px rgba(110, 59, 110, 0.2)"
                }}
                data-testid={`badge-${badge.text.toLowerCase().replace('-', '')}`}
              >
                <i className={`${badge.icon} text-${badge.color} mr-2`}></i>
                <span className="text-ivory">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeAIFeature, setActiveAIFeature] = useState(0);
  const [activeSupplementPhase, setActiveSupplementPhase] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const aiFeatures = [
    { 
      title: "Period Prediction", 
      desc: "AI learns your unique patterns", 
      icon: "fas fa-calendar-alt", 
      color: "mint",
      tags: ["AI-Powered", "Predictive"]
    },
    { 
      title: "Phase-Smart Plans", 
      desc: "Workouts & meals that sync", 
      icon: "fas fa-user-cog", 
      color: "blush",
      tags: ["Personalized", "Adaptive"]
    },
    { 
      title: "Medical Insights", 
      desc: "Evidence-backed explanations", 
      icon: "fas fa-microscope", 
      color: "rose-gold",
      tags: ["Evidence-Based", "Clinical"]
    },
    { 
      title: "Symptom Tracking", 
      desc: "Smart monitoring & alerts", 
      icon: "fas fa-chart-line", 
      color: "plum",
      tags: ["Monitoring", "Smart"]
    },
    { 
      title: "Cycle Education", 
      desc: "Learn about your body", 
      icon: "fas fa-graduation-cap", 
      color: "mint",
      tags: ["Educational", "Empowering"]
    }
  ];

  const supplementPhases = [
    { 
      phase: "Menses", 
      color: "mint", 
      nutrients: ["Iron", "Magnesium", "Vitamin C"], 
      desc: "Recovery & comfort",
      tags: ["Recovery", "Comfort"]
    },
    { 
      phase: "Follicular", 
      color: "blush", 
      nutrients: ["B6", "Zinc", "Folate"], 
      desc: "Energy & renewal",
      tags: ["Energy", "Renewal"]
    },
    { 
      phase: "Ovulation", 
      color: "rose-gold", 
      nutrients: ["Vitamin E", "Selenium", "CoQ10"], 
      desc: "Peak vitality",
      tags: ["Vitality", "Peak"]
    },
    { 
      phase: "Luteal", 
      color: "plum", 
      nutrients: ["B Complex", "Calcium", "Magnesium"], 
      desc: "Balance & calm",
      tags: ["Balance", "Calm"]
    }
  ];

  // Auto-cycle through features (optimized intervals)
  useEffect(() => {
    const aiInterval = setInterval(() => {
      setActiveAIFeature((prev) => (prev + 1) % aiFeatures.length);
    }, 4000);
    
    const supplementInterval = setInterval(() => {
      setActiveSupplementPhase((prev) => (prev + 1) % supplementPhases.length);
    }, 5000);

    return () => {
      clearInterval(aiInterval);
      clearInterval(supplementInterval);
    };
  }, []);

  return (
    <section id="features" className="relative z-5 py-12 sm:py-20 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto lg:items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* AI Cycle Coach Card */}
          <motion.div 
            className="glass-morphism-card rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 flex flex-col h-full"
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 15px 30px rgba(110, 59, 110, 0.15)"
            }}
            data-testid="card-ai-cycle-coach"
          >
            <div className="mb-6">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-mint to-blush rounded-2xl flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="fas fa-heartbeat text-2xl text-ivory"></i>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-ivory mb-3">Rove AI Cycle Coach</h3>
              <p className="text-champagne/80 text-base sm:text-lg leading-relaxed">
                Phase-aware daily plans for Indian women — meals, workouts, and gentle habit nudges, all personalized.
              </p>
            </div>
            
            {/* Interactive AI Feature Showcase */}
            <div className="mb-6 flex-grow">
              <motion.div 
                key={activeAIFeature}
                className={`p-4 rounded-2xl bg-gradient-to-r from-${aiFeatures[activeAIFeature].color}/20 to-${aiFeatures[activeAIFeature].color}/10 border border-${aiFeatures[activeAIFeature].color}/30`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center mb-2">
                      <i className={`${aiFeatures[activeAIFeature].icon} text-${aiFeatures[activeAIFeature].color} mr-3 text-lg`}></i>
                      <span className="text-ivory font-bold text-lg">{aiFeatures[activeAIFeature].title}</span>
                    </div>
                    <p className="text-champagne/70 text-sm">{aiFeatures[activeAIFeature].desc}</p>
                  </div>
                  <motion.div 
                    className={`w-3 h-3 rounded-full bg-${aiFeatures[activeAIFeature].color}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {aiFeatures[activeAIFeature].tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs bg-${aiFeatures[activeAIFeature].color}/20 text-${aiFeatures[activeAIFeature].color} border border-${aiFeatures[activeAIFeature].color}/30`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              {/* Feature indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {aiFeatures.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      index === activeAIFeature ? 'bg-mint w-6' : 'bg-champagne/30'
                    }`}
                    onClick={() => setActiveAIFeature(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Animated Cycle Wave */}
            <div className="h-12 bg-gradient-to-r from-mint/20 via-blush/30 to-plum/20 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="flex space-x-2">
                {[0, 0.2, 0.4, 0.6].map((delay, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 rounded-full ${index === 0 ? 'h-8 bg-mint' : index === 1 ? 'h-6 bg-blush' : index === 2 ? 'h-10 bg-rose-gold' : 'h-4 bg-plum'}`}
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Phase-wise Supplement Card */}
          <motion.div 
            className="glass-morphism-card rounded-3xl p-8 hover:scale-105 transition-all duration-300 flex flex-col h-full"
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 15px 30px rgba(110, 59, 110, 0.15)"
            }}
            data-testid="card-supplement-system"
          >
            <div className="mb-6">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-plum to-mint rounded-2xl flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: -1 }}
              >
                <i className="fas fa-leaf text-2xl text-ivory"></i>
              </motion.div>
              <h3 className="text-2xl font-bold text-ivory mb-3">Phase-wise Supplement System</h3>
              <p className="text-champagne/80 text-lg leading-relaxed">
                Clinically reviewed formulations aligned to menses, follicular, ovulation, and luteal needs.
              </p>
            </div>
            
            {/* Interactive Phase Showcase */}
            <div className="mb-6 flex-grow">
              <motion.div 
                key={activeSupplementPhase}
                className={`p-4 rounded-2xl bg-gradient-to-r from-${supplementPhases[activeSupplementPhase].color}/20 to-${supplementPhases[activeSupplementPhase].color}/10 border border-${supplementPhases[activeSupplementPhase].color}/30`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-ivory font-bold text-lg">{supplementPhases[activeSupplementPhase].phase}</h4>
                    <p className="text-champagne/70 text-sm">{supplementPhases[activeSupplementPhase].desc}</p>
                  </div>
                  <motion.div 
                    className={`w-3 h-3 rounded-full bg-${supplementPhases[activeSupplementPhase].color}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {supplementPhases[activeSupplementPhase].nutrients.map((nutrient, idx) => (
                    <span 
                      key={idx}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs bg-${supplementPhases[activeSupplementPhase].color}/20 text-${supplementPhases[activeSupplementPhase].color} border border-${supplementPhases[activeSupplementPhase].color}/30`}
                    >
                      {nutrient}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {supplementPhases[activeSupplementPhase].tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs bg-${supplementPhases[activeSupplementPhase].color}/10 text-${supplementPhases[activeSupplementPhase].color} border border-${supplementPhases[activeSupplementPhase].color}/20`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              {/* Phase indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {supplementPhases.map((phase, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      index === activeSupplementPhase ? `bg-${phase.color} w-6` : 'bg-champagne/30'
                    }`}
                    onClick={() => setActiveSupplementPhase(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Elegant Bottle Silhouette */}
            <div className="h-12 bg-gradient-to-r from-mint/20 via-blush/30 to-plum/20 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="flex space-x-2">
                {[0, 0.2, 0.4, 0.6].map((delay, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 rounded-full ${index === 0 ? 'h-8 bg-mint' : index === 1 ? 'h-6 bg-blush' : index === 2 ? 'h-10 bg-rose-gold' : 'h-4 bg-plum'}`}
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

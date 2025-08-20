import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import TrustBadges from "@/components/trust-badges";
import WaitlistForm from "@/components/waitlist-form";
import AnimatedBackground from "@/components/animated-background";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-plum via-ink-dark to-deep-plum text-ivory overflow-x-hidden relative">
      <AnimatedBackground />
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-sm bg-gradient-to-b from-deep-plum/40 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            {/* Logo with enhanced design */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-deep-plum via-plum to-ink-dark flex items-center justify-center shadow-lg border border-ivory/20">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blush text-xl font-bold"
                >
                  R
                </motion.div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blush via-rose-gold to-champagne bg-clip-text text-transparent">
                  Rove
                </span>
                <div className="text-xs text-blush/80 font-medium tracking-wider -mt-1">
                  HEALTH
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: "Home", section: "hero", icon: "fas fa-home" },
                { name: "Features", section: "features", icon: "fas fa-sparkles" },
                { name: "Join Waitlist", section: "waitlist", icon: "fas fa-user-plus", primary: true }
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 group ${
                    item.primary
                      ? 'bg-gradient-to-r from-deep-plum to-plum text-blush shadow-lg hover:shadow-xl border border-blush/30'
                      : 'text-champagne hover:text-ivory hover:bg-ivory/10'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`nav-${item.section}`}
                >
                  <div className="flex items-center space-x-2">
                    <i className={`${item.icon} text-sm`}></i>
                    <span>{item.name}</span>
                  </div>
                  {!item.primary && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mint to-blush rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-12 h-12 rounded-xl bg-ivory/10 backdrop-blur-sm flex items-center justify-center mobile-touch-target"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="mobile-menu-toggle"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1">
                <motion.div 
                  className="w-4 h-0.5 bg-ivory rounded-full"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-4 h-0.5 bg-ivory rounded-full"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-4 h-0.5 bg-ivory rounded-full"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent"></div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 bottom-0 z-50 md:hidden bg-deep-plum/98 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="container mx-auto px-4 sm:px-6 py-6 pt-20">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-ivory/10 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-times text-ivory text-lg"></i>
                </motion.button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Home", section: "hero", icon: "fas fa-home" },
                  { name: "Features", section: "features", icon: "fas fa-sparkles" },
                  { name: "Join Waitlist", section: "waitlist", icon: "fas fa-user-plus", primary: true }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.section)}
                    className={`w-full px-4 sm:px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 mobile-touch-target ${
                      item.primary
                        ? 'bg-gradient-to-r from-deep-plum to-plum text-blush shadow-lg border border-blush/30'
                        : 'text-champagne hover:text-ivory hover:bg-ivory/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`mobile-nav-${item.section}`}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span className="text-lg">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <HeroSection onJoinWaitlist={() => scrollToSection("waitlist")} onLearnMore={() => scrollToSection("features")} />
      <FeaturesSection />
      <TrustBadges />
      <WaitlistForm />
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-5 py-8 sm:py-12 px-4 sm:px-6 border-t border-ivory/10"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="text-xl sm:text-2xl font-bold text-ivory mb-2">
                <span className="bg-gradient-to-r from-plum to-blush bg-clip-text text-transparent">
                  Rove
                </span>
              </div>
              <p className="text-champagne/60">Launching soon — stay in rhythm.</p>
            </div>
            
            <div className="flex space-x-6 justify-center md:justify-start">
              <motion.a 
                href="https://www.instagram.com/rovehealthindia/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#F4C4D4" }}
                className="text-champagne/60 transition-colors duration-300"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, color: "#CFE8E5" }}
                className="text-champagne/60 transition-colors duration-300"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </motion.a>
              <motion.a 
                href="/privacy" 
                whileHover={{ scale: 1.1, color: "#E8B4B8" }}
                className="text-champagne/60 transition-colors duration-300"
                data-testid="link-privacy"
              >
                Privacy
              </motion.a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-ivory/10">
            <p className="text-champagne/60">© 2025 Rove Health. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import ResultsCard, { AssessmentResult } from "@/components/assessment/ResultsCard";
import AnimatedBackground from "@/components/animated-background";

export default function AssessmentResults() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Get results from sessionStorage
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
      } catch (error) {
        console.error('Error parsing assessment result:', error);
        // Redirect back to assessment if no valid results
        setLocation('/assessment');
      }
    } else {
      // Redirect back to assessment if no results found
      setLocation('/assessment');
    }
  }, [setLocation]);

  const handleReturnHome = () => {
    // Clear the stored results
    sessionStorage.removeItem('assessmentResult');
    setLocation('/');
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-plum via-ink-dark to-deep-plum text-ivory flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-ivory border-t-transparent rounded-full"
        />
      </div>
    );
  }

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
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
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
            </Link>

            {/* Back to Assessment */}
            <Link href="/assessment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-champagne hover:text-ivory transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Assessment</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-5 min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-ivory via-champagne to-blush bg-clip-text text-transparent">
                Your Health Assessment Results
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-champagne/80 max-w-2xl mx-auto leading-relaxed">
              Based on your responses, here's your comprehensive reproductive health assessment with personalized recommendations.
            </p>
          </motion.div>

          <ResultsCard result={result} onReturnHome={handleReturnHome} />
        </div>
      </div>
    </div>
  );
}

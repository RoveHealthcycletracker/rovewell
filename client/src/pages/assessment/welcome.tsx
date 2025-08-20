import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Disclaimer from "@/components/assessment/Disclaimer";
import AnimatedBackground from "@/components/animated-background";

export default function AssessmentWelcome() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleStart = async () => {
    setError(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please confirm consent to proceed.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "", goal: "assessment", consent: "assessment" }),
      });
      // Ignore duplicate email error; allow proceeding
      if (!res.ok && res.status !== 409) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Unable to register email");
      }
      sessionStorage.setItem("rove_email", email);
      setLocation("/assessment/questionnaire");
    } catch (e: any) {
      // Still allow proceeding but show a soft warning
      sessionStorage.setItem("rove_email", email);
      setLocation("/assessment/questionnaire");
    } finally {
      setSubmitting(false);
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

            {/* Back to Home */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-champagne hover:text-ivory transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-5 min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-mint/20 to-blush/20 backdrop-blur-sm border border-mint/30 flex items-center justify-center"
            >
              <Heart className="h-10 w-10 text-blush" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-ivory via-champagne to-blush bg-clip-text text-transparent">
                Women's Health Assessment
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-champagne/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards understanding your reproductive health. Our comprehensive assessment 
              evaluates cycle health, PCOS risk, endometriosis risk, and overall wellbeing with personalized insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Disclaimer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-gradient-to-r from-mint/10 to-blush/10 border border-mint/30 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-mint to-blush flex items-center justify-center">
                    <span className="text-ivory text-xs font-bold">🔒</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-mint mb-2">Your Privacy Matters</h3>
                  <p className="text-champagne/80 text-sm leading-relaxed">
                    <strong>Your data is completely private.</strong> None of your assessment answers, results, or personal information will be stored, shared, or seen by anyone. 
                    Your responses are processed in real-time to generate your personalized results and are immediately discarded. 
                    We're committed to protecting your privacy and ensuring your health information remains confidential.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-ivory mb-4">What to Expect</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-mint mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80">
                  <strong className="text-champagne">50 questions</strong> across 5 friendly sections covering lifestyle, periods, symptoms, health history, and fertility
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blush mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80">
                  <strong className="text-champagne">10-15 minutes</strong> to complete the comprehensive assessment
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-rose-gold mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80">
                  <strong className="text-champagne">Multi-score results</strong> with cycle health, PCOS risk, endometriosis risk, and wellbeing insights
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-6"
          >
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-ivory">Enter your email to begin</h3>
                <p className="text-xs text-champagne/70 mt-1">We’ll use this to send your results later (optional), and it helps us personalize your experience.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-ink-dark border-ivory/20 text-ivory"
                />
                <Button
                  onClick={handleStart}
                  disabled={submitting}
                  className="group bg-gradient-to-r from-mint to-blush hover:from-blush hover:to-mint text-ivory font-semibold px-6"
                >
                  <span className="flex items-center">
                    {submitting ? "Starting..." : "Start Assessment"}
                    <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </div>
              <label className="flex items-center gap-2 text-xs text-champagne/70">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                I consent to receive my results and agree to the privacy notice above.
              </label>
              {error && <p className="text-xs text-rose-400">{error}</p>}
              <p className="text-[11px] text-champagne/60">We will not store your assessment answers. You can unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

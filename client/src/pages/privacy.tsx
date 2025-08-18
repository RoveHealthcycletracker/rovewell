import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-plum via-ink-dark to-deep-plum text-ivory">
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-gold via-blush to-mint bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-champagne/80 text-lg">Last Updated: August 2025</p>
          </motion.div>

          {/* Introduction */}
          <motion.div 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <p className="text-champagne/90 text-lg leading-relaxed">
              At Rove Health, your privacy comes first. We are a doctor-led, AI-powered women's health platform 
              committed to keeping your data secure, confidential, and always under your control.
            </p>
          </motion.div>

          {/* Section 1: Information We Collect */}
          <motion.section 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-ivory mb-6 flex items-center">
              <i className="fas fa-database text-mint mr-3"></i>
              1. Information We Collect
            </h2>
            <p className="text-champagne/80 mb-6">
              We collect only the data needed to deliver safe, personalized health insights:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-mint/50 pl-6">
                <h3 className="text-ivory font-semibold mb-2">Account Information</h3>
                <p className="text-champagne/70">Name, email address (for waitlist, login, or communication).</p>
              </div>
              <div className="border-l-4 border-blush/50 pl-6">
                <h3 className="text-ivory font-semibold mb-2">Cycle & Symptom Data</h3>
                <p className="text-champagne/70">Period dates, cycle length, symptoms, and optional lifestyle/vitals data.</p>
              </div>
              <div className="border-l-4 border-rose-gold/50 pl-6">
                <h3 className="text-ivory font-semibold mb-2">Supplement Preferences</h3>
                <p className="text-champagne/70">If you choose to use Rove's supplements, we may store your intake logs and related choices.</p>
              </div>
              <div className="border-l-4 border-plum/50 pl-6">
                <h3 className="text-ivory font-semibold mb-2">Device & Usage Data</h3>
                <p className="text-champagne/70">Basic analytics (app version, interactions, crash reports) to improve the experience.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: How We Use Your Data */}
          <motion.section 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-ivory mb-6 flex items-center">
              <i className="fas fa-cogs text-blush mr-3"></i>
              2. How We Use Your Data
            </h2>
            <p className="text-champagne/80 mb-6">
              We use your data only to provide and improve Rove's services:
            </p>
            <ul className="space-y-3 text-champagne/70">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-mint mr-3 mt-1"></i>
                To generate AI-powered cycle coaching (diet, exercise, lifestyle guidance).
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-mint mr-3 mt-1"></i>
                To recommend and track phase-specific supplements.
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-mint mr-3 mt-1"></i>
                To personalize insights, forecasts, and notifications.
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-mint mr-3 mt-1"></i>
                To improve our algorithms and user experience (in de-identified, aggregated form).
              </li>
            </ul>
          </motion.section>

          {/* Section 3: How We Protect Your Data */}
          <motion.section 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-ivory mb-6 flex items-center">
              <i className="fas fa-shield-alt text-rose-gold mr-3"></i>
              3. How We Protect Your Data
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-mint/10 to-mint/5 rounded-2xl p-4 border border-mint/20">
                <h3 className="text-ivory font-semibold mb-2 flex items-center">
                  <i className="fas fa-lock text-mint mr-2"></i>
                  Privacy-First Architecture
                </h3>
                <p className="text-champagne/70 text-sm">All personal health data is stored securely with Row-Level Security (RLS) in our database.</p>
              </div>
              <div className="bg-gradient-to-r from-blush/10 to-blush/5 rounded-2xl p-4 border border-blush/20">
                <h3 className="text-ivory font-semibold mb-2 flex items-center">
                  <i className="fas fa-key text-blush mr-2"></i>
                  Encryption
                </h3>
                <p className="text-champagne/70 text-sm">Data is encrypted in transit (HTTPS/TLS) and at rest.</p>
              </div>
              <div className="bg-gradient-to-r from-rose-gold/10 to-rose-gold/5 rounded-2xl p-4 border border-rose-gold/20">
                <h3 className="text-ivory font-semibold mb-2 flex items-center">
                  <i className="fas fa-ban text-rose-gold mr-2"></i>
                  No Third-Party Selling
                </h3>
                <p className="text-champagne/70 text-sm">We do not sell or share your health data with advertisers.</p>
              </div>
              <div className="bg-gradient-to-r from-plum/10 to-plum/5 rounded-2xl p-4 border border-plum/20">
                <h3 className="text-ivory font-semibold mb-2 flex items-center">
                  <i className="fas fa-user-shield text-plum mr-2"></i>
                  Access Control
                </h3>
                <p className="text-champagne/70 text-sm">Only you can view and control your personal health record.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Your Rights */}
          <motion.section 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-ivory mb-6 flex items-center">
              <i className="fas fa-user-check text-plum mr-3"></i>
              4. Your Rights
            </h2>
            <p className="text-champagne/80 mb-6">You have full control over your data:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <i className="fas fa-eye text-mint mr-3 mt-1"></i>
                <div>
                  <h3 className="text-ivory font-semibold">Access & Update</h3>
                  <p className="text-champagne/70 text-sm">View and edit your data anytime in the app.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-download text-blush mr-3 mt-1"></i>
                <div>
                  <h3 className="text-ivory font-semibold">Export</h3>
                  <p className="text-champagne/70 text-sm">Request a copy of your data in a machine-readable format.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-trash-alt text-rose-gold mr-3 mt-1"></i>
                <div>
                  <h3 className="text-ivory font-semibold">Delete</h3>
                  <p className="text-champagne/70 text-sm">Request deletion of all your data through in-app settings.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-hand-paper text-plum mr-3 mt-1"></i>
                <div>
                  <h3 className="text-ivory font-semibold">Consent</h3>
                  <p className="text-champagne/70 text-sm">You can withdraw your consent for data processing anytime.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Sections 5, 6, 7 */}
          <motion.section 
            className="glass-morphism-card rounded-3xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-ivory mb-4 flex items-center">
              <i className="fas fa-share-alt text-champagne mr-3"></i>
              5. Data Sharing
            </h2>
            <p className="text-champagne/80 mb-6">
              We may share anonymized or aggregated insights for medical research, but never identifiable data without your explicit consent.
            </p>

            <h2 className="text-2xl font-bold text-ivory mb-4 mt-8 flex items-center">
              <i className="fas fa-gavel text-champagne mr-3"></i>
              6. Compliance
            </h2>
            <p className="text-champagne/80 mb-4">Rove Health complies with:</p>
            <ul className="space-y-2 text-champagne/70 mb-6">
              <li className="flex items-start">
                <i className="fas fa-flag text-mint mr-3 mt-1"></i>
                India's DPDP Act (2023) — user consent, data minimization, and deletion rights.
              </li>
              <li className="flex items-start">
                <i className="fas fa-globe text-blush mr-3 mt-1"></i>
                International best practices (HIPAA-like safeguards where applicable).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-ivory mb-4 mt-8 flex items-center">
              <i className="fas fa-envelope text-champagne mr-3"></i>
              7. Contact Us
            </h2>
            <p className="text-champagne/80 mb-4">For questions, concerns, or requests about your data:</p>
            <div className="bg-gradient-to-r from-mint/10 to-blush/10 rounded-2xl p-6 border border-mint/20">
              <div className="flex items-center justify-center">
                <i className="fas fa-envelope text-mint mr-3 text-xl"></i>
                <a 
                  href="mailto:privacy@rovehealth.in" 
                  className="text-ivory font-semibold text-lg hover:text-mint transition-colors duration-300"
                  data-testid="link-privacy-email"
                >
                  privacy@rovehealth.in
                </a>
              </div>
            </div>
          </motion.section>

          {/* Back to Home Button */}
          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <motion.button
              onClick={() => window.location.href = '/'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-plum to-rose-gold hover:from-rose-gold hover:to-plum px-8 py-4 rounded-2xl text-ivory font-semibold text-lg shadow-2xl transition-all duration-300"
              data-testid="button-back-home"
            >
              <span className="flex items-center">
                <i className="fas fa-arrow-left mr-3"></i>
                Back to Home
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
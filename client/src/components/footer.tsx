import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-deep-plum/90 to-ink-dark/90 backdrop-blur-sm border-t border-champagne/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-gold via-blush to-mint bg-clip-text text-transparent">
              Rove Health
            </h3>
            <p className="text-champagne/60 mt-2">Science-Led Care, Synced to You.</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/privacy">
              <motion.a 
                className="text-champagne/80 hover:text-ivory transition-colors duration-300 font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
                data-testid="link-privacy-footer"
              >
                <i className="fas fa-shield-alt mr-2 text-mint"></i>
                Privacy Policy
              </motion.a>
            </Link>
            <motion.a 
              href="mailto:privacy@rovehealth.in"
              className="text-champagne/80 hover:text-ivory transition-colors duration-300 font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              data-testid="link-contact-footer"
            >
              <i className="fas fa-envelope mr-2 text-blush"></i>
              Contact
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-champagne/20 mt-8 pt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-champagne/60 text-sm">
            © 2025 Rove Health. All rights reserved. • Made with 💚 for women's wellness.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
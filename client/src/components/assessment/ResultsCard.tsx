import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle, ExternalLink, Lightbulb, Heart, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssessmentScores {
  cycle_health_score: number;
  pcos_risk_score: number;
  endometriosis_risk_score: number;
  wellbeing_score: number;
}

interface AssessmentResult {
  assessment: string;
  explanation: string;
  next_steps: string;
  resources: { title: string; url: string }[];
  risk_score: number;
  scores?: AssessmentScores;
  personalized_insights?: string[];
  lifestyle_recommendations?: string[];
  medical_priorities?: string[];
  supplement_recommendation?: string;
}

interface ResultsCardProps {
  result: AssessmentResult;
  onReturnHome: () => void;
}

export default function ResultsCard({ result, onReturnHome }: ResultsCardProps) {
  const getRiskIcon = (assessment: string) => {
    const lowerAssessment = assessment.toLowerCase();
    if (lowerAssessment.includes('high')) {
      return <AlertCircle className="h-8 w-8 text-red-400" />;
    } else if (lowerAssessment.includes('moderate')) {
      return <AlertCircle className="h-8 w-8 text-amber-400" />;
    } else if (lowerAssessment.includes('low')) {
      return <CheckCircle className="h-8 w-8 text-mint" />;
    }
    return <XCircle className="h-8 w-8 text-champagne" />;
  };

  const getRiskColor = (assessment: string) => {
    const lowerAssessment = assessment.toLowerCase();
    if (lowerAssessment.includes('high')) {
      return 'from-red-500/20 to-red-600/20 border-red-500/30';
    } else if (lowerAssessment.includes('moderate')) {
      return 'from-amber-500/20 to-amber-600/20 border-amber-500/30';
    } else if (lowerAssessment.includes('low')) {
      return 'from-mint/20 to-green-500/20 border-mint/30';
    }
    return 'from-champagne/20 to-ivory/20 border-champagne/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Assessment Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`bg-gradient-to-br ${getRiskColor(result.assessment)} backdrop-blur-sm border rounded-2xl p-8`}
      >
        <div className="flex items-center space-x-4 mb-4">
          {getRiskIcon(result.assessment)}
          <h2 className="text-2xl font-bold text-ivory">Assessment Result</h2>
        </div>
        <p className="text-xl font-semibold text-champagne mb-4">{result.assessment}</p>
        <p className="text-champagne/80 leading-relaxed">{result.explanation}</p>
        {result.risk_score !== undefined && (
          <div className="mt-4 p-3 bg-ivory/10 rounded-xl">
            <p className="text-sm text-champagne/70">Overall Risk Proxy: <span className="font-semibold text-champagne">{result.risk_score}/100</span></p>
          </div>
        )}
      </motion.div>

      {/* Scores Grid */}
      {result.scores && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 border border-ivory/10 rounded-2xl p-6">
            <h4 className="text-champagne/80 mb-1">Cycle Health</h4>
            <p className="text-3xl font-bold text-ivory">{result.scores.cycle_health_score}<span className="text-champagne/60 text-lg">/100</span></p>
          </div>
          <div className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 border border-ivory/10 rounded-2xl p-6">
            <h4 className="text-champagne/80 mb-1">PCOS Risk</h4>
            <p className="text-3xl font-bold text-ivory">{result.scores.pcos_risk_score}<span className="text-champagne/60 text-lg">/100</span></p>
          </div>
          <div className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 border border-ivory/10 rounded-2xl p-6">
            <h4 className="text-champagne/80 mb-1">Endometriosis Risk</h4>
            <p className="text-3xl font-bold text-ivory">{result.scores.endometriosis_risk_score}<span className="text-champagne/60 text-lg">/100</span></p>
          </div>
          <div className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 border border-ivory/10 rounded-2xl p-6">
            <h4 className="text-champagne/80 mb-1">Wellbeing</h4>
            <p className="text-3xl font-bold text-ivory">{result.scores.wellbeing_score}<span className="text-champagne/60 text-lg">/100</span></p>
          </div>
        </motion.div>
      )}

      {/* Personalized Insights */}
      {result.personalized_insights && result.personalized_insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-blush" />
            <h3 className="text-xl font-bold text-ivory">Personalized Insights</h3>
          </div>
          <div className="space-y-3">
            {result.personalized_insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 rounded-full bg-blush mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80 leading-relaxed">{insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lifestyle Recommendations */}
      {result.lifestyle_recommendations && result.lifestyle_recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-6 w-6 text-mint" />
            <h3 className="text-xl font-bold text-ivory">Lifestyle Recommendations</h3>
          </div>
          <div className="space-y-3">
            {result.lifestyle_recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 rounded-full bg-mint mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80 leading-relaxed">{recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Medical Priorities */}
      {result.medical_priorities && result.medical_priorities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Stethoscope className="h-6 w-6 text-rose-gold" />
            <h3 className="text-xl font-bold text-ivory">Medical Priorities</h3>
          </div>
          <div className="space-y-3">
            {result.medical_priorities.map((priority, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 rounded-full bg-rose-gold mt-2 flex-shrink-0"></div>
                <p className="text-champagne/80 leading-relaxed">{priority}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Supplement Recommendation */}
      {result.supplement_recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-gradient-to-br from-mint/20 to-blush/20 backdrop-blur-sm border border-mint/30 rounded-2xl p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint to-blush flex items-center justify-center">
              <span className="text-ivory font-bold text-sm">R</span>
            </div>
            <h3 className="text-xl font-bold text-ivory">Supplement Recommendation</h3>
          </div>
          <p className="text-champagne/80 leading-relaxed mb-4">{result.supplement_recommendation}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-mint to-blush hover:from-blush hover:to-mint text-ivory font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
          >
            Learn More About Rove PCOSense
          </motion.button>
        </motion.div>
      )}

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
      >
        <h3 className="text-xl font-bold text-ivory mb-4">Recommended Next Steps</h3>
        <p className="text-champagne/80 leading-relaxed">{result.next_steps}</p>
      </motion.div>

      {/* Resources */}
      {result.resources && result.resources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-gradient-to-br from-deep-plum/40 to-ink-dark/40 backdrop-blur-sm border border-ivory/10 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-ivory mb-4">Helpful Resources</h3>
          <div className="space-y-3">
            {result.resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-ivory/5 hover:bg-ivory/10 transition-colors duration-200 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-champagne group-hover:text-ivory">{resource.title}</span>
                <ExternalLink className="h-4 w-4 text-champagne/60 group-hover:text-ivory" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Return Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={onReturnHome}
          className="bg-gradient-to-r from-mint to-blush hover:from-blush hover:to-mint text-ivory font-semibold px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-300"
        >
          Return to Home
        </Button>
      </motion.div>
    </motion.div>
  );
}

export type { AssessmentResult };

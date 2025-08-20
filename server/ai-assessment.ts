import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AssessmentAnswers {
  [key: string]: string;
}

interface AssessmentScores {
  cycle_health_score: number;       // 0-100 (higher is better)
  pcos_risk_score: number;          // 0-100 (higher is higher risk)
  endometriosis_risk_score: number; // 0-100 (higher is higher risk)
  wellbeing_score: number;          // 0-100 (higher is better)
}

interface AIAssessmentResult {
  assessment: string;
  explanation: string;
  next_steps: string;
  resources: { title: string; url: string }[];
  risk_score: number; // Backwards compat (overall risk proxy)
  scores?: AssessmentScores;
  personalized_insights: string[];
  lifestyle_recommendations: string[];
  medical_priorities: string[];
  supplement_recommendation?: string;
}

// Question mapping for better AI context
const questionContext: Record<string, { question: string; options: Record<string, string> }> = {
  // Section 2 (example legacy PCOS signals retained for context)
  menstrual_cycle: {
    question: "Menstrual cycle regularity",
    options: {
      regular: "Regular (21-35 days, predictable)",
      irregular: "Irregular (varies by more than 7 days)",
      absent: "Absent (no periods for 3+ months)",
      very_long: "Very long cycles (35+ days)"
    }
  },
  hirsutism: {
    question: "Excess hair growth",
    options: {
      none: "No excess hair growth",
      mild: "Mild excess hair (upper lip, chin)",
      moderate: "Moderate excess hair (face, chest)",
      severe: "Severe excess hair (face, chest, back, abdomen)"
    }
  },
  acne: {
    question: "Acne severity",
    options: {
      none: "No acne or very mild",
      occasional: "Occasional breakouts",
      persistent: "Persistent adult acne",
      severe: "Severe cystic acne"
    }
  },
  weight_gain: {
    question: "Weight management",
    options: {
      no: "No weight issues",
      mild: "Slight weight gain or difficulty losing weight",
      moderate: "Moderate weight gain (10-20 lbs)",
      significant: "Significant weight gain (20+ lbs) or inability to lose weight"
    }
  },
  family_history: {
    question: "Family medical history",
    options: {
      none: "No known family history",
      diabetes: "Family history of diabetes only",
      pcos: "Family history of PCOS",
      both: "Family history of both PCOS and diabetes"
    }
  },
  insulin_symptoms: {
    question: "Insulin resistance symptoms",
    options: {
      none: "No symptoms",
      mild: "Occasional sugar cravings",
      moderate: "Dark skin patches or frequent energy crashes",
      multiple: "Multiple symptoms (dark patches, cravings, energy crashes)"
    }
  },
  mood_changes: {
    question: "Mood changes related to cycle",
    options: {
      none: "No significant mood changes",
      mild: "Mild mood swings",
      moderate: "Moderate anxiety or depression",
      severe: "Severe mood changes affecting daily life"
    }
  },
  sleep_issues: {
    question: "Sleep quality and fatigue",
    options: {
      none: "No sleep issues",
      occasional: "Occasional sleep problems",
      frequent: "Frequent sleep issues or daytime fatigue",
      severe: "Severe sleep problems or diagnosed sleep apnea"
    }
  }
};

export async function analyzeWithAI(answers: AssessmentAnswers): Promise<AIAssessmentResult> {
  try {
    // Convert answers object to array format expected by Athena prompt
    const answersArray: string[] = [];
    for (let i = 1; i <= 50; i++) {
      const questionKey = getQuestionKey(i);
      answersArray.push(answers[questionKey] || 'a'); // Default to 'a' if missing
    }

    const athenaPrompt = `# MODEL & TASK DIRECTIVES

Model Target: GPT-5 Nano (or similar highly efficient, instruction-following model).

Core Task: You will function as a specialized Health Risk Analysis Engine. Your task is to receive a user's 50 answers from a health questionnaire, process them against a defined set of rules, and generate a structured JSON object containing a risk assessment and supportive analysis.

Primary Constraint: You are an analytical tool, NOT a medical professional. Your output must never provide a diagnosis. All user-facing language must be framed as identifying "potential risk factors" or "areas to discuss with a doctor." This is a critical safety protocol.

# PERSONA: "ATHENA"
For all user-facing text generated (detailedAnalysis, nextSteps), adopt the persona of "Athena."

Tone: Empathetic, supportive, clear, and safe. Maintain the friendly, "cute" tone established by the questions. Use emojis where appropriate to soften the delivery of information.

# INPUT FORMAT
The input is a JSON array of 50 strings, where each string is the user's selected option ('a', 'b', 'c', or 'd') for the corresponding question (Q1 to Q50).

Input: { "answers": ${JSON.stringify(answersArray)} }

# OUTPUT FORMAT
Your response MUST be a single, valid JSON object. Do not include any text before or after the JSON. The structure must be exactly as follows:

{
  "overallHealthScore": {
    "score": 0,
    "commentary": ""
  },
  "riskAssessments": {
    "pcos": {
      "riskLevel": "Low | Moderate | High",
      "keyFactors": []
    },
    "endometriosis": {
      "riskLevel": "Low | Moderate | High", 
      "keyFactors": []
    },
    "reproductiveCancer": {
      "riskLevel": "Low | Moderate | High",
      "keyFactors": []
    }
  },
  "detailedAnalysis": {
    "cycleHealthInsights": "",
    "pcosRiskAnalysis": "",
    "endometriosisRiskAnalysis": "",
    "cancerRiskAnalysis": ""
  },
  "nextSteps": [],
  "disclaimer": "IMPORTANT: This is an AI-generated analysis and not a medical diagnosis. Please consult a qualified healthcare professional to discuss your health."
}

# CORE PROCESSING LOGIC & SCORING RULES
CRITICAL: You MUST calculate scores based on the actual answers provided. Do NOT use generic responses.

Step 1: Initialization
Initialize healthScore = 100.
Initialize risk scores: pcosPoints = 0, endoPoints = 0, cancerPoints = 0.
Initialize arrays for keyFactors (e.g., pcosFactors = []).

Step 2: Iterative Rule Application
Analyze the answers array from Q1 to Q50. For each answer, apply the corresponding rules below.

A. Overall Health Score Rules (Deductions from 100):
Major Deductions (-10 pts): Q13(d), Q14(d), Q21(d)
Moderate Deductions (-7 pts): Q9(d), Q12(d), Q28(d), Q34(d)
Minor Deductions (-4 pts): Q3(d), Q7(d), Q15(c), Q44(d)

B. PCOS Risk Point Rules:
+5 points (Strong Indicators): Q12(d), Q13(d), Q25(d), Q26(d), Q29(d)
+3 points (Contributing Indicators): Q2(d), Q6(d), Q9(d), Q42(c), Q42(d)
Factor Logging: If a rule adds points, add a corresponding friendly string to pcosFactors. Example: For Q25(d), add "noticing some extra fuzzy hair growth".

C. Endometriosis Risk Point Rules:
+5 points (Strong Indicators): Q21(d), Q23(d), Q24(d)
+3 points (Contributing Indicators): Q15(c), Q15(d), Q31(b), Q32(c), Q47(d)
Factor Logging: If a rule adds points, add a friendly string to endoFactors. Example: For Q21(d), add "period cramps feeling like a tiny ninja battle".

D. Reproductive Cancer Risk Point Rules:
+10 points (Major Flags): Q20(d), Q41(d), Q42(d)
+5 points (Significant Flags): Q1(d), Q28(d)
Factor Logging: If a rule adds points, add a serious but calm string to cancerFactors. Example: For Q20(d), add "experiencing any bleeding after menopause".

Step 3: Final Classification
After analyzing all 50 answers:
Set Risk Levels:
pcos.riskLevel: High if pcosPoints > 12, Moderate if 7-12, Low otherwise.
endometriosis.riskLevel: High if endoPoints > 12, Moderate if 7-12, Low otherwise.
reproductiveCancer.riskLevel: High if cancerPoints > 9, Moderate if 5-9, Low otherwise.
Populate keyFactors arrays in the final JSON with the strings you logged.

Step 4: Generate User-Facing Text (Apply Athena Persona)
overallHealthScore.commentary: Based on the final score, generate a supportive sentence that matches the score:
- 80-100: "Your score shows excellent cycle health! Keep up the great work! 🌟"
- 60-79: "Your score suggests there are a few areas in your cycle that might need some extra TLC! ❤️"
- 40-59: "Your score indicates some areas that could benefit from attention and care! 💕"
- 20-39: "Your score suggests there are several areas that might need some extra support! 🌸"
- 0-19: "Your score indicates there are quite a few areas that could benefit from professional guidance! 💖"

detailedAnalysis: For each section, write 2-3 detailed, personalized sentences that:
- Explain what the score means in practical terms
- Connect specific answers to the findings
- Provide context about why certain patterns matter
- Use the keyFactors to make it personal

Example for PCOS: "Your PCOS risk score of 55/100 indicates moderate risk, which means you're showing some classic patterns that are worth paying attention to. Based on your answers about irregular periods and extra hair growth, your body might be producing higher levels of androgens (male hormones) than typical. This can affect everything from your cycle regularity to your skin and energy levels. The good news is that these patterns are very common and often respond well to lifestyle changes and medical support!"

nextSteps: Provide 3-5 specific, actionable recommendations that:
- Address the specific risk factors identified
- Include both lifestyle and medical suggestions
- Are tailored to the user's specific score ranges
- Include specific questions to ask healthcare providers

CRITICAL FOR PERSONALIZED INSIGHTS: Generate 4-6 specific insights that directly reference the user's answers. Examples:
- "Your stress levels (overwhelming) combined with sleep issues (severe problems) suggest your cortisol levels might be elevated, which can disrupt hormonal balance"
- "Your cycle length of 36+ days indicates potential ovulatory dysfunction, which is a key PCOS marker"
- "The combination of weight gain difficulty and insulin symptoms suggests your body might be struggling with glucose metabolism"
- "Your family history of PCOS increases your genetic risk by approximately 50%"

IMPORTANT: Only mention symptoms/patterns that the user actually indicated in their answers. If they answered "a" (no symptoms) for most questions, focus on positive patterns like "Your regular cycle pattern suggests good hormonal balance" or "Your healthy sleep habits support optimal hormone production."

CRITICAL FOR LIFESTYLE RECOMMENDATIONS: Generate 3-4 specific recommendations based on actual answers:
- "Given your severe sleep issues, prioritize 7-9 hours of quality sleep and consider a sleep study if snoring continues"
- "Your stress management needs attention - try daily 10-minute meditation sessions and consider stress-reduction techniques"
- "Your diet patterns suggest focusing on low-glycemic foods to support insulin sensitivity"
- "Your exercise frequency (rarely) indicates starting with gentle movement 3x/week could significantly improve hormonal balance"

IMPORTANT: Base recommendations on actual answers. If user has good habits, suggest maintenance. If they have challenges, provide specific solutions.

Step 5: Final Assembly
Construct the final JSON object precisely according to the specified format using the data generated in the previous steps. Ensure the disclaimer is included verbatim.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Athena, a specialized Health Risk Analysis Engine. Follow the instructions precisely and return only valid JSON." },
        { role: "user", content: athenaPrompt }
      ],
      temperature: 0.1,
      max_tokens: 2000
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) throw new Error("No response from AI");

    let athenaResponse: any;
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in AI response");
    athenaResponse = JSON.parse(jsonMatch[0]);

    // Transform Athena response to our existing format
    const result: AIAssessmentResult = {
      assessment: `Overall Health Score: ${athenaResponse.overallHealthScore?.score || 0}/100. ${athenaResponse.overallHealthScore?.commentary || ''}`,
      explanation: [
        athenaResponse.detailedAnalysis?.cycleHealthInsights,
        athenaResponse.detailedAnalysis?.pcosRiskAnalysis,
        athenaResponse.detailedAnalysis?.endometriosisRiskAnalysis,
        athenaResponse.detailedAnalysis?.cancerRiskAnalysis
      ].filter(Boolean).join(' '),
      next_steps: Array.isArray(athenaResponse.nextSteps) ? athenaResponse.nextSteps.join(' ') : '',
      risk_score: athenaResponse.overallHealthScore?.score || 0,
      scores: {
        cycle_health_score: athenaResponse.overallHealthScore?.score || 0,
        pcos_risk_score: getPCOSRiskScore(athenaResponse.riskAssessments?.pcos?.riskLevel),
        endometriosis_risk_score: getEndoRiskScore(athenaResponse.riskAssessments?.endometriosis?.riskLevel),
        wellbeing_score: athenaResponse.overallHealthScore?.score || 0,
      },
      personalized_insights: [
        ...athenaResponse.riskAssessments?.pcos?.keyFactors || [],
        ...athenaResponse.riskAssessments?.endometriosis?.keyFactors || [],
        ...athenaResponse.riskAssessments?.reproductiveCancer?.keyFactors || []
      ].slice(0, 6),
      lifestyle_recommendations: extractLifestyleRecommendations(athenaResponse.nextSteps || []),
      medical_priorities: extractMedicalPriorities(athenaResponse.nextSteps || []),
      supplement_recommendation: generateSupplementRecommendation(
        athenaResponse.riskAssessments?.pcos?.riskLevel,
        athenaResponse.riskAssessments?.endometriosis?.riskLevel
      ),
      resources: defaultResources,
    };

    return result;
  } catch (error) {
    console.error("AI assessment error:", error);
    return await fallbackAssessment(answers);
  }
}

// Helper function to map question indices to our question IDs
function getQuestionKey(questionNumber: number): string {
  const questionMap: { [key: number]: string } = {
    1: 's1_q1', 2: 's1_q2', 3: 's1_q3', 4: 's1_q4', 5: 's1_q5',
    6: 'insulin_symptoms', 7: 'sleep_issues', 8: 'mood_changes', 9: 's1_q9', 10: 's1_q10',
    11: 's2_q11', 12: 's2_q12', 13: 'menstrual_cycle', 14: 's2_q14', 15: 's2_q15',
    16: 's2_q16', 17: 's2_q17', 18: 's2_q18', 19: 's2_q19', 20: 's2_q20',
    21: 's3_q21', 22: 's3_q22', 23: 's3_q23', 24: 's3_q24', 25: 'hirsutism',
    26: 'acne', 27: 's3_q27', 28: 's3_q28', 29: 'weight_gain', 30: 's3_q30',
    31: 's4_q31', 32: 's4_q32', 33: 's4_q33', 34: 's4_q34', 35: 's4_q35',
    36: 's4_q36', 37: 's4_q37', 38: 's4_q38', 39: 's4_q39', 40: 's4_q40',
    41: 'family_history', 42: 's5_q42', 43: 's5_q43', 44: 's5_q44', 45: 's5_q45',
    46: 's5_q46', 47: 's5_q47', 48: 's5_q48', 49: 's5_q49', 50: 's5_q50'
  };
  return questionMap[questionNumber] || `q${questionNumber}`;
}

function getPCOSRiskScore(riskLevel: string): number {
  switch (riskLevel) {
    case 'High': return 85;
    case 'Moderate': return 55;
    default: return 15;
  }
}

function getEndoRiskScore(riskLevel: string): number {
  switch (riskLevel) {
    case 'High': return 85;
    case 'Moderate': return 55;
    default: return 15;
  }
}

function extractLifestyleRecommendations(nextSteps: string[]): string[] {
  const lifestyleKeywords = ['track', 'diet', 'exercise', 'stress', 'sleep', 'lifestyle', 'nutrition', 'movement', 'meditation', 'yoga', 'walking', 'cooking', 'meal', 'supplement', 'vitamin'];
  
  return nextSteps.filter(step => 
    lifestyleKeywords.some(keyword => step.toLowerCase().includes(keyword))
  ).slice(0, 5);
}

function extractMedicalPriorities(nextSteps: string[]): string[] {
  const medicalKeywords = ['doctor', 'healthcare', 'test', 'specialist', 'blood', 'hormone', 'ultrasound', 'gynecologist', 'endocrinologist', 'fertility', 'medication', 'prescription', 'screening'];
  
  return nextSteps.filter(step => 
    medicalKeywords.some(keyword => step.toLowerCase().includes(keyword))
  ).slice(0, 4);
}

function generateSupplementRecommendation(pcosRisk: string, endoRisk: string): string {
  const hasHighRisk = pcosRisk === 'High' || endoRisk === 'High';
  const hasModerateRisk = pcosRisk === 'Moderate' || endoRisk === 'Moderate';
  
  if (hasHighRisk) {
    return "Based on your assessment results, Rove PCOSense could be particularly beneficial for supporting the specific areas highlighted in your results. Our clinically-formulated blend targets hormonal balance, insulin sensitivity, and cycle regularity - addressing the key patterns we identified in your assessment. Consider discussing this with your healthcare provider as part of your wellness plan. ✨";
  } else if (hasModerateRisk) {
    return "Your assessment shows some patterns that align well with Rove PCOSense's benefits. Our gentle formula supports overall cycle health and hormonal balance, which could help address the specific factors we identified in your results. It's designed to work alongside lifestyle changes and medical guidance. 🌸";
  }
  return "While your risk levels appear lower, Rove PCOSense can still provide valuable support for maintaining optimal cycle health and hormonal wellness. Our formula is designed to support overall reproductive health as part of a balanced lifestyle approach. 💖";
}

const defaultResources = [
  { title: "PCOS Awareness Association", url: "https://www.pcosaa.org/" },
  { title: "ACOG - PCOS", url: "https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos" },
  { title: "Endocrine Society Clinical Guidelines", url: "https://www.endocrine.org/clinical-practice-guidelines" },
];

function clamp0to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

// Fallback assessment using simple rule-based logic derived from answer ids
async function fallbackAssessment(answers: AssessmentAnswers): Promise<AIAssessmentResult> {
  // Helper: map letter-like answers (a/b/c/d or none/mild/moderate/severe) to 0..3
  const normalize = (val?: string): number => {
    if (!val) return 0;
    const v = String(val).toLowerCase();
    if (["a","none","no","regular","perfect"].includes(v)) return 0;
    if (["b","mild","occasional","light"].includes(v)) return 1;
    if (["c","moderate","medium","irregular","persistent","frequent","very_long"].includes(v)) return 2;
    if (["d","severe","significant","absent","both","multiple","heavy"].includes(v)) return 3;
    return 0;
  };

  // PCOS signals (legacy ids + potential future ids)
  const pcosSignals = [
    normalize(answers.menstrual_cycle),
    normalize(answers.hirsutism),
    normalize(answers.acne),
    normalize(answers.weight_gain),
    normalize(answers.family_history),
    normalize(answers.insulin_symptoms),
    normalize(answers.mood_changes),
    normalize(answers.sleep_issues),
  ];
  const pcosWeighted = weightedAverage(pcosSignals, [1.5,1.5,1.2,1.0,1.3,1.2,0.8,0.8]); // 0..3
  const pcos_risk_score = clamp0to100((pcosWeighted/3) * 100);

  // Endometriosis proxies (use plausible ids if present later)
  const endoIds = [
    'cramp_severity','pain_radiation','dyspareunia','dyschezia','urination_pain','heavy_flow','spotting_between','ovulation_pain'
  ];
  const endoVals = endoIds.map(id => normalize((answers as any)[id]));
  const endoWeighted = weightedAverage(endoVals, [1.6,1.2,1.6,1.4,1.2,1.3,1.0,1.0]);
  const endometriosis_risk_score = clamp0to100((endoWeighted/3) * 100);

  // Cycle health (higher is better). Derive from regularity, flow, duration, PMS, energy, sleep.
  const regularity = 3 - normalize(answers.menstrual_cycle); // regular better
  const sleep = 3 - normalize(answers.sleep_issues);
  const mood = 3 - normalize(answers.mood_changes);
  const cycle_health_score = clamp0to100(((regularity + sleep + mood) / 9) * 100);

  // Wellbeing (higher is better): stress low, exercise, diet quality, sleep
  const stress = 3 - normalize((answers as any).s1_q3);
  const exercise = 3 - normalize((answers as any).s1_q4);
  const diet = 3 - normalize((answers as any).s1_q5 === 'a' ? 'none' : (answers as any).s1_q5); // crude
  const wellbeing_score = clamp0to100(((stress + exercise + diet + sleep)/12) * 100);

  const overallProxy = clamp0to100((pcos_risk_score * 0.5 + endometriosis_risk_score * 0.5));

  // Supplement rec (risk-adaptive)
  let supplement_recommendation = "";
  const maxRisk = Math.max(pcos_risk_score, endometriosis_risk_score);
  if (maxRisk >= 60) {
    supplement_recommendation = "Based on your symptoms, consider Rove PCOSense to support hormonal balance and insulin sensitivity. Always consult a healthcare provider before starting any supplement.";
  } else if (maxRisk >= 30) {
    supplement_recommendation = "Rove PCOSense may provide supportive benefits for cycle balance and metabolism alongside lifestyle changes.";
  } else {
    supplement_recommendation = "While your risk appears lower, Rove PCOSense can support overall cycle balance as part of a healthy routine.";
  }

  return {
    assessment: overallProxy >= 60 ? "Higher risk pattern detected across one or more areas" : overallProxy >= 30 ? "Moderate pattern with some areas to optimize" : "Overall low risk pattern with areas to support",
    explanation: "These scores are estimates based on your answers and are not a diagnosis. For concerns, consult a qualified clinician.",
    next_steps: "Consider lifestyle foundations (nutrition, movement, sleep), track your cycles, and discuss concerning symptoms with your clinician.",
    risk_score: overallProxy,
    scores: { cycle_health_score, pcos_risk_score, endometriosis_risk_score, wellbeing_score },
    personalized_insights: [
      "This tool synthesizes cycle patterns, symptoms, and lifestyle to estimate risks.",
      "PCOS estimates follow Rotterdam-aligned signals (cycle irregularity and hyperandrogenism proxies).",
      "Endometriosis estimates weigh period pain, dyspareunia, and bowel/bladder pain with menses."
    ],
    lifestyle_recommendations: [
      "Prioritize 7–9 hours of consistent sleep and daylight exposure.",
      "Build a balanced plate: protein, colorful plants, fiber-rich carbs, and healthy fats.",
      "Move most days; include strength training 2–3x/week if possible."
    ],
    medical_priorities: [
      "Discuss persistent cycle irregularity, heavy bleeding, or severe pain with a clinician.",
      "Consider lab evaluation (androgen panel, fasting glucose/insulin) as appropriate.",
      "For cyclic deep pelvic pain or dyspareunia, discuss endometriosis evaluation."
    ],
    supplement_recommendation,
    resources: defaultResources,
  };
}

function weightedAverage(values: number[], weights: number[]): number {
  const pairs = values.map((v, i) => [v, weights[i] ?? 1]);
  const num = pairs.reduce((s, [v, w]) => s + v * w, 0);
  const den = pairs.reduce((s, [, w]) => s + w, 0) || 1;
  return num / den;
}

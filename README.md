# RoveWell - AI-Powered PCOS Assessment Tool

A comprehensive women's health platform featuring an intelligent PCOS (Polycystic Ovary Syndrome) assessment tool powered by OpenAI's GPT-4.

## 🚀 Features

### AI-Enhanced PCOS Assessment
- **Intelligent Analysis**: Uses OpenAI GPT-4 for personalized symptom analysis
- **Rotterdam Criteria**: Based on established medical criteria for PCOS diagnosis
- **Personalized Insights**: AI-generated insights specific to individual symptom patterns
- **Lifestyle Recommendations**: Tailored lifestyle and wellness advice
- **Medical Priorities**: Prioritized medical concerns for healthcare discussions
- **Risk Scoring**: Numerical risk assessment (0-100) with detailed explanations

### Coming Soon Page
- Beautiful, animated landing page for Rove Health
- Waitlist signup functionality
- Seamless integration with assessment tool

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **AI**: OpenAI GPT-4 API
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Framer Motion animations + Custom design system

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RoveWell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/rovewell"
   
   # OpenAI Configuration (Required for AI assessment)
   OPENAI_API_KEY="your-openai-api-key-here"
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Session Configuration
   SESSION_SECRET="your-session-secret-here"
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start individually:
   npm run dev:backend  # Backend on port 5000
   npm run dev:frontend # Frontend on port 5173
   ```

## 🎯 Usage

### PCOS Assessment Flow
1. Visit the homepage at `http://localhost:5173`
2. Click "Try our Free PCOS Assessment"
3. Complete the 8-question assessment
4. Receive AI-powered personalized results including:
   - Risk assessment and score
   - Personalized insights
   - Lifestyle recommendations
   - Medical priorities
   - Next steps and resources

### API Endpoints

- `POST /api/assess` - AI-powered PCOS assessment
- `POST /api/waitlist` - Join waitlist
- `GET /api/waitlist` - Get waitlist entries (admin)

## 🤖 AI Features

The assessment tool uses OpenAI's GPT-4 to provide:

- **Contextual Analysis**: Understands symptom relationships and patterns
- **Medical Accuracy**: Based on Rotterdam criteria and clinical guidelines
- **Personalization**: Tailored recommendations based on unique symptom combinations
- **Compassionate Tone**: Supportive, empathetic communication
- **Fallback System**: Rule-based assessment if AI is unavailable

## 🎨 Design System

The application uses a custom design system with:
- **Color Palette**: Deep plum, ink dark, blush, mint, champagne, ivory
- **Animations**: Framer Motion for smooth, engaging interactions
- **Typography**: Modern, readable fonts with proper hierarchy
- **Components**: Reusable UI components with consistent styling

## 🔒 Security & Privacy

- Medical disclaimer prominently displayed
- No personal health data stored permanently
- Assessment results stored only in session storage
- Secure API communication with OpenAI

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Optimized for all screen sizes
- Accessible design patterns

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Railway
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For questions or support, please open an issue in the repository.

---

**Note**: This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.

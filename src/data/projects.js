export const projects = [
  {
    id: 'cosmoguide',
    tag: '01 / FULL-STACK AI',
    title: 'CosmoGuide — AI Space Exploration Cockpit',
    year: '2026',
    status: 'Live system',
    metricValue: '11 providers',
    metricLabel: 'Hybrid multi-model routing',
    description: 'A React and Express space-learning cockpit that combines multi-provider AI chat, browser-side 3D simulations, astronomy tools, and a rate-limited demo experience.',
    decision: 'A thin-server architecture keeps interactive simulation in the browser while protecting demo API keys behind an Express proxy.',
    caseStudy: {
      problem: 'A useful space companion needed live AI assistance and rich simulations without forcing every first-time visitor to configure an API key.',
      solution: 'Built a React 19 cockpit with an Express proxy, provider-specific adapters, a three-tier key strategy, rate limiting, and local browser storage for user-owned keys and preferences.',
      results: 'Delivered 17 interactive modules, routing across 11 AI providers, 50 demo requests per IP per day, and a deployed application with user-key, demo-key, and no-key fallback states.'
    },
    workflow: [
      { label: 'Visitor', detail: 'Chat, simulations, tools' },
      { label: 'React cockpit', detail: '17 browser modules' },
      { label: 'Express proxy', detail: 'Routing + rate limits' },
      { label: 'AI providers', detail: '11 provider adapters' },
      { label: 'Response', detail: 'Mode + citations' }
    ],
    evidence: ['React 19 + TypeScript', '17 feature modules', '50 requests/IP/day demo tier', 'Provider-specific API adapters'],
    chips: ['React', 'TypeScript', 'Express', 'Gemini', 'Groq', 'Multi-provider AI', 'Canvas', 'Rate limiting'],
    github: 'https://github.com/Naydhurve3/CosmoGuide',
    live: 'https://cosmo-guide-eta.vercel.app/',
    sourceLabel: 'README + source architecture',
    color: '#818cf8'
  },
  {
    id: 'atm-simulation',
    tag: '02 / ML ENGINEERING',
    title: 'FinSight · ATM & Banking Ecosystem v3.0',
    year: '2026',
    status: '60 tests',
    metricValue: '20 models',
    metricLabel: 'Forecasting, risk, clustering and monitoring',
    description: 'A banking analytics ecosystem built on real monthly RBI ATM/card statistics from 65 banks, with an ATM simulator, three data stores, ML model registry, CLI, and Flask dashboard.',
    decision: 'Three purpose-specific SQLite databases separate source analytics, transactional application state, and append-only ML feature/model lineage.',
    caseStudy: {
      problem: 'Banking experiments often isolate a single model and omit the operational system around ingestion, user flows, monitoring, reporting, and retraining.',
      solution: 'Built a layered Python platform combining CSV ingestion, feature storage, 20 ML/DL and rules-based models, age-aware KYC, transaction fraud scoring, passbook generation, and five dashboard pages.',
      results: 'Integrated 65-bank RBI data, 20 analytical models, 21 feature definitions, three SQLite databases, 60 tests, and PDF/CSV/Excel reporting in one runnable platform.'
    },
    workflow: [
      { label: 'RBI data', detail: '65 banks × 24 months' },
      { label: 'Ingestion', detail: 'CSV cleaning + catalog' },
      { label: 'Data layer', detail: '3 SQLite databases' },
      { label: 'Model layer', detail: '20 ML/DL models' },
      { label: 'Experience', detail: 'CLI + Flask + reports' }
    ],
    evidence: ['65 banks × 24 months', '3 SQLite databases', '20 ML/DL models', '60 automated tests'],
    chips: ['Python', 'XGBoost', 'Prophet', 'TensorFlow', 'Flask', 'SQLite', 'Plotly', 'Model registry'],
    github: 'https://github.com/Naydhurve3/FinSight',
    live: 'https://atm-simulation-tau.vercel.app/auth/login',
    liveLabel: 'Live Demo',
    sourceLabel: 'README + v3.0 architecture',
    color: '#f59e0b'
  },
  {
    id: 'hr-analytics',
    tag: '03 / ANALYTICAL RESEARCH',
    title: 'Workforce Interaction Analytics Research Platform',
    year: '2026',
    status: '58 tests',
    metricValue: '1,755 tests',
    metricLabel: 'Feature-interaction hypotheses evaluated',
    description: 'A phase-isolated research pipeline examining whether statistically significant workforce feature interactions add predictive value across outcomes and models.',
    decision: 'Independent numbered phases create reproducible artifacts and keep deep EDA, interaction mining, predictive modelling, and reporting reviewable in isolation.',
    caseStudy: {
      problem: 'Workforce dashboards surface correlations, but rarely test whether feature interactions remain useful across outcomes, models, and validation procedures.',
      solution: 'Implemented seven runnable phases for deep EDA, 27-feature engineering, 1,755 interaction tests, LR/RF/XGBoost modelling, SHAP and survival analysis, deep dives, dashboards, and HTML reporting.',
      results: 'Produced 60 figures, 10 analysis datasets, machine-readable Parquet/JSON artifacts, 58 tests, a standalone report, and a research-paper blueprint while preserving the v1 archive.'
    },
    workflow: [
      { label: 'Raw workforce', detail: 'Profile + validate' },
      { label: 'Feature layer', detail: '27 engineered features' },
      { label: 'Interaction mining', detail: '1,755 hypothesis tests' },
      { label: 'Model validation', detail: 'LR + RF + XGB + SHAP' },
      { label: 'Research output', detail: '60 figures + report' }
    ],
    evidence: ['1,755 interaction tests', '27 engineered features', '60 research figures', '58 automated tests'],
    chips: ['Python', 'Pandas', 'XGBoost', 'SHAP', 'Survival analysis', 'Parquet', 'Pytest', 'Research reporting'],
    github: 'https://github.com/Naydhurve3/WorkForce-Data-Analysis',
    live: 'https://github.com/Naydhurve3/workforce-analytics-research-site',
    liveLabel: 'Research Atlas',
    sourceLabel: 'README + v2 pipeline',
    color: '#ef4444'
  },
  {
    id: 'lits17-liver-segmentation',
    tag: '04 / DEEP LEARNING · MEDICAL IMAGING',
    title: 'Liver & Tumor Segmentation Platform (LiTS-17)',
    year: '2026',
    status: 'External validation',
    metricValue: '131 volumes',
    metricLabel: 'LiTS-17 + 3D-IRCADb validation',
    description: 'A complete LiTS-17 liver tumour segmentation pipeline: EDA and spatial forensics, patient-aware splits, a two-stage ROI model, checkpoint fusion (Mark 1 → 4E), and external validation on 3D-IRCADb.',
    decision: 'A two-stage ROI strategy (liver first, tumour inside the liver mask) reduces the search space, while checkpoint fusion across epochs stabilises segmentation quality.',
    caseStudy: {
      problem: 'Liver tumour segmentation in 3D CT is hard to validate honestly: naive random splits leak slices from the same patient between train and test sets.',
      solution: 'Built a canonical LiTS-17 build (131 volumes / 58,638 slices) with QA, spatial forensics, patient-aware train/val/test splits, a 2-stage ROI pipeline, and Mark 1 → 4E checkpoint fusion, shipped as a reproducible manifest-verified build.',
      results: 'Delivered a fully documented platform with external 3D-IRCADb validation, radiological QA (Radiomics), license-compliant distribution (CC BY-NC 4.0), and a reproducible build identified by SHA-256 manifest.'
    },
    workflow: [
      { label: 'LiTS-17 raw', detail: '131 CT volumes · 58,638 slices' },
      { label: 'EDA + forensics', detail: 'Spatial & quality QA' },
      { label: 'Patient-aware splits', detail: 'No slice leakage' },
      { label: '2-stage ROI', detail: 'Liver → tumour focus' },
      { label: 'Fusion + validation', detail: 'Mark 1→4E + 3D-IRCADb' }
    ],
    evidence: ['131 volumes / 58,638 slices', 'Patient-aware splits', '2-stage ROI pipeline', 'Checkpoint fusion Mark 1→4E', '3D-IRCADb external validation'],
    chips: ['PyTorch', 'Segmentation', 'LiTS-17', '3D CT', 'ROI pipeline', 'Radiomics', 'Checkpoint fusion', 'Medical imaging'],
    github: 'https://github.com/Naydhurve3/Liver-Tumor-Segmentation-LiTS-17-',
    sourceLabel: 'README + manifest build',
    color: '#ef4444'
  }
];

export const secondaryProjects = [
  {
    id: 'movie-recommender',
    tag: 'RECOMMENDER SYSTEMS',
    title: 'TMDb Content-Based Movie Recommender',
    metricValue: '5,000 movies',
    metricLabel: 'Metadata similarity search',
    description: 'A content-based recommender that merges TMDb movie and credit data, parses genres, keywords, cast and crew, then ranks related titles using cosine similarity.',
    chips: ['Python', 'Pandas', 'Cosine similarity', 'TMDb', 'NLP'],
    github: 'https://github.com/Naydhurve3/MOVIE-RECOMMENDATION-SYSTEM',
    color: '#818cf8'
  },
  {
    id: 'customer-segmentation',
    tag: 'CUSTOMER ANALYTICS',
    title: 'Customer Segmentation & Lookalike Modelling',
    metricValue: '3 tasks',
    metricLabel: 'EDA, lookalikes and clustering',
    description: 'Transaction analysis combining business EDA, cosine-similarity lookalikes, and five-cluster K-Means segmentation—with weak silhouette quality reported transparently.',
    chips: ['Python', 'K-Means', 'PCA', 'Cosine similarity', 'EDA'],
    github: 'https://github.com/Naydhurve3/eCommerce-Transactions-Dataset',
    color: '#a855f7'
  },
  {
    id: 'resume-parser',
    tag: 'NLP · HIRING TOOLS',
    title: 'Resume Parser & Skill Matcher',
    metricValue: 'spaCy',
    metricLabel: 'NLP extraction pipeline',
    description: 'Extracts text from .docx resumes, preprocesses with spaCy, scores each CV against a desired-skill set, and surfaces named entities plus word clouds for review.',
    chips: ['Python', 'spaCy', 'NLP', 'NER', 'WordCloud'],
    github: 'https://github.com/Naydhurve3/Resume-Parser-using-ML',
    color: '#10b981'
  },
  {
    id: 'flipkart-sentiment',
    tag: 'NLP · E-COMMERCE',
    title: 'Flipkart Reviews Sentiment Analysis',
    metricValue: '3 classes',
    metricLabel: 'Positive · negative · neutral',
    description: 'Cleans and preprocesses real Flipkart review text with NLTK, classifies sentiment polarity, and visualises distributions with Seaborn, Plotly, and WordCloud.',
    chips: ['Python', 'NLTK', 'Seaborn', 'Plotly', 'WordCloud'],
    github: 'https://github.com/Naydhurve3/Flipkart-Sentiment-Analysis',
    color: '#f43f5e'
  },
  {
    id: 'sales-forecast',
    tag: 'TIME SERIES',
    title: 'Sales Forecasting with ARIMA',
    metricValue: 'ARIMA',
    metricLabel: 'Monthly trend projection',
    description: 'Analyses historical monthly sales, inspects stationarity and seasonality, then fits ARIMA to project future demand for business planning.',
    chips: ['Python', 'ARIMA', 'Time series', 'Pandas', 'Forecasting'],
    github: 'https://github.com/Naydhurve3/Sales-Forecast',
    color: '#f59e0b'
  },
  {
    id: 'facial-expression',
    tag: 'COMPUTER VISION',
    title: 'Facial Expression Detection (CNN + SVM)',
    metricValue: 'CNN→SVM',
    metricLabel: 'Transfer-learned features',
    description: 'Trains a CNN for expression classification, then reuses its learned features to train an SVM classifier—combining deep feature extraction with classical classification.',
    chips: ['Python', 'TensorFlow', 'CNN', 'SVM', 'Transfer learning'],
    github: 'https://github.com/Naydhurve3/Facial-Expression-Detection-Using-Neural-Network',
    color: '#67e8f9'
  },
  {
    id: 'house-price',
    tag: 'REGRESSION',
    title: 'House Price Prediction (California Housing)',
    metricValue: '8 features',
    metricLabel: 'Location, age & income drivers',
    description: 'Preprocesses and visualises the classic California housing dataset, then trains regression models and evaluates prediction quality against the median price target.',
    chips: ['Python', 'Pandas', 'Scikit-learn', 'Regression', 'EDA'],
    github: 'https://github.com/Naydhurve3/HOUSE-PRICE-PREDICTION',
    color: '#a855f7'
  },
  {
    id: 'book-recommender',
    tag: 'RECOMMENDER SYSTEMS',
    title: 'Book Recommendation Engine (KNN)',
    metricValue: 'Book-Crossing',
    metricLabel: 'Collaborative filtering',
    description: 'Applies k-nearest-neighbours collaborative filtering over the Book-Crossing ratings dataset to suggest titles based on user taste patterns.',
    chips: ['Python', 'KNN', 'Collaborative filtering', 'Pandas'],
    github: 'https://github.com/Naydhurve3/Book-Recommendation-Engine-using-KNN',
    color: '#10b981'
  }
];

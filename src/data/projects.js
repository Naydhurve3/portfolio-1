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
    title: 'Banking ML Analytics & ATM Simulation Platform',
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
    github: 'https://github.com/Naydhurve3/ATM-Simulation',
    sourceLabel: 'README + architecture docs',
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
  }
];

export const secondaryProjects = [
  {
    id: 'liver-cancer',
    tag: 'COMPUTER VISION',
    title: 'Liver CT Cancer Classification',
    metricValue: '58,638 slices',
    metricLabel: 'LiTS-derived PNG dataset',
    description: 'CNN experimentation for liver CT cancer classification using preprocessing, augmentation, TFRecords, and a constrained 10-epoch training run.',
    chips: ['Python', 'TensorFlow', 'CNN', 'TFRecord', 'Medical imaging'],
    github: 'https://github.com/Naydhurve3/LIVER-CT-SCAN-DATASET',
    color: '#ef4444'
  },
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
  }
];

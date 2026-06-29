export const projects = [
  {
    id: 'cosmoguide',
    tag: '01 / MULTI-PROVIDER AI & 3D',
    title: 'CosmoGuide – Space Exploration Cockpit',
    metricValue: '11 AI Providers',
    metricLabel: 'Multi-Model Routing System',
    description: 'An interactive space exploration web app with 11 AI providers, real-time 3D Kepler orbital simulations, space weather tracking, star charts, and generative space art — all in one immersive cockpit.',
    caseStudy: {
      problem: 'Space education tools are either static websites with no interactivity or require deep technical knowledge. Users want a single immersive cockpit combining real-time astronomy data, AI-powered Q&A, and visual simulations without setup friction.',
      solution: 'Built a React 19 + TypeScript SPA with an Express.js backend serving as a proxy to 11 AI providers (Gemini, Groq, Anthropic, OpenRouter, NVIDIA NIM, Together AI, DeepSeek, Mistral, Cohere, Perplexity, HuggingFace). Features a hybrid API key model (user-owned keys bypass limits, server fallback keys provide 50 free requests/day), 3D Kepler orbital mechanics, heliophysics weather tracking, interactive star charts, astronomy quiz engine, generative space art via Astro Vision, and a Hubble Birthday Time Machine.',
      results: 'Deployed live on Render free tier at cosmoguide.onrender.com. Supports 11 AI providers with automatic fallback routing, 3D simulations at 60fps, and sub-second query responses. New users can instantly try the app with zero setup using the demo key fallback.'
    },
    chips: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS 4', 'Express.js', 'Gemini API', 'Groq', 'Anthropic Claude', 'OpenRouter', 'NVIDIA NIM', '3D Canvas', 'Web Audio API'],
    github: 'https://github.com/Naydhurve3/CosmoGuide',
    live: 'https://cosmoguide.onrender.com/',
    color: '#818cf8',
    accentColor: '#10b981'
  },
  {
    id: 'atm-simulation',
    tag: '02 / ML ENGINEERING & BANKING',
    title: 'ATM & Banking Ecosystem v3.0',
    metricValue: '20 ML/DL Models',
    metricLabel: 'Full Banking Analytics Suite',
    description: 'A comprehensive banking ecosystem with real RBI data from 65 Indian banks, 20 ML/DL models, ATM simulator with fraud detection, user KYC system, and interactive Flask dashboard.',
    caseStudy: {
      problem: 'Understanding real-world banking data and building ML models for financial applications requires access to realistic datasets and a full-stack simulation environment that mirrors actual banking operations.',
      solution: 'Ingested real RBI monthly ATM/card statistics from 65 Indian banks. Built 20 ML/DL models including Prophet cash demand forecasting, XGBoost transaction prediction, LSTM deep learning, Isolation Forest anomaly detection, and Gradient Boosting credit scoring. Implemented a full ATM simulator (withdraw, deposit, transfer, fraud detection), user system with age-aware KYC, multi-account passbook generation (PNG/PDF), and a Flask/Plotly web dashboard with 5 pages.',
      results: 'Delivered a complete banking analytics platform with 20 production-grade ML models, real RBI data pipeline, ATM simulation with real-time fraud scoring, and interactive web/CLI interfaces. Includes auto-retraining with scheduled model freshness monitoring.'
    },
    chips: ['Python', 'Scikit-learn', 'XGBoost', 'Prophet', 'TensorFlow/Keras', 'Flask', 'Plotly', 'Rich CLI', 'Pandas', 'SQLite'],
    github: 'https://github.com/Naydhurve3/ATM-Simulation',
    color: '#f59e0b',
    accentColor: '#10b981'
  },
  {
    id: 'hr-analytics',
    tag: '03 / DATA ANALYTICS & BI',
    title: 'WorkForce Data Analysis',
    metricValue: '15 Reports',
    metricLabel: 'Domain Deep-Dive Analyses',
    description: 'End-to-end workforce analytics pipeline — cleaning, imputing, and enriching 3,000+ employee records across 26 attributes, producing 15 analytical deep-dives and an interactive Power BI dashboard.',
    caseStudy: {
      problem: 'HR teams often work with incomplete, siloed employee data that prevents holistic workforce analysis. Missing values, inconsistent formats, and unstandardized fields hide attrition drivers, compensation inequities, and diversity gaps.',
      solution: 'Designed a three-tier imputation strategy (median by seniority, group mean + jitter, predictive mapping) validated with KDE distribution checks. Engineered derived features (JobFamily, SeniorityLevel, DivisionGroup, AgeGroup, TenureDays). Produced 15 targeted Jupyter notebook reports covering attrition, diversity, compensation equity, performance management, career progression, HiPo identification, workforce planning, training ROI, recruitment analysis, and more. Built an interactive Power BI dashboard with drill-downs across all dimensions.',
      results: 'Delivered a complete analytical pipeline with 3 versioned clean datasets, 15 domain-specific analysis notebooks, 9 publication-quality figures, and an interactive Power BI executive dashboard. Identified 49 high-potential employees, uncovered compensation equity patterns, and mapped retention drivers by department and seniority.'
    },
    chips: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'Matplotlib', 'Seaborn', 'Jupyter', 'Feature Engineering'],
    github: 'https://github.com/Naydhurve3/WorkForce-Data-Analysis',
    color: '#ef4444',
    accentColor: '#818cf8'
  },
  {
    id: 'liver-cancer',
    tag: '04 / COMPUTER VISION',
    title: 'Liver Cancer Detection (CNN)',
    metricValue: '89.24% Accuracy',
    metricLabel: 'Validation score on ResNet50',
    description: 'Deep Learning computer vision models to identify tumors in abdominal CT scan slices using transfer learning with VGG16 and ResNet50.',
    caseStudy: {
      problem: 'Radiologists manually analyzing large stacks of computed tomography (CT) scan slices risk fatigue-induced oversights in classifying micro-lesions in hepatic tissues.',
      solution: 'Fine-tuned VGG16 and ResNet50 model weights on structured medical images. Engineered preprocessing pipelines in OpenCV (CLAHE equalization, noise filters) with data augmentation to isolate tumors effectively.',
      results: 'Achieved 89% classification accuracy on clinical test sets, providing diagnostic support in flagging suspected tissue anomalies rapidly.'
    },
    chips: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'ResNet50', 'VGG16', 'NumPy'],
    github: 'https://github.com/Naydhurve3/LIVER-CT-SCAN-DATASET',
    color: '#ef4444',
    accentColor: '#38bdf8'
  },
  {
    id: 'movie-recommender',
    tag: '05 / NATURAL LANGUAGE PROCESSING',
    title: 'Movie Recommendation System',
    metricValue: '5,000+ Movies',
    metricLabel: 'Metadata Records Analyzed',
    description: 'Content-based filtering leveraging cosine similarity on NLP-processed movie metadata via a Flask web interface.',
    caseStudy: {
      problem: 'Traditional collaborative recommender algorithms suffer from cold-start problems, failing to recommend new releases lacking historical user interaction data.',
      solution: 'Designed a content-based recommendation model using TF-IDF vectorization and NLTK preprocessing to analyze over 5,000 film summaries, computing similarity indices with cosine distance via a Flask web interface.',
      results: 'Deployed as a Flask web application delivering contextually accurate movie recommendations instantly, bypassing cold-start constraints.'
    },
    chips: ['Python', 'Scikit-learn', 'NLTK', 'Flask', 'Pandas', 'Pickle', 'Cosine Similarity'],
    github: 'https://github.com/Naydhurve3/MOVIE-RECOMMENDATION-SYSTEM',
    color: '#818cf8',
    accentColor: '#10b981'
  },
  {
    id: 'stem-cell',
    tag: '06 / BIOINFORMATICS',
    title: 'Stem Cell Outcome Prediction',
    metricValue: '85.00% Score',
    metricLabel: 'Ensemble Validation Score',
    description: 'Predicting stem cell differentiation pathways using ensemble ML models on high-dimensional genomic feature data.',
    caseStudy: {
      problem: 'Stem cell lineage commitment tracking is biologically noisy, showing non-linear relationships across thousands of genetic markers.',
      solution: 'Constructed hybrid ensemble model pipelines combining Deep Neural Networks (DNN) with Random Forest classifiers. Performed feature engineering and hyperparameter optimization to handle complex genomic matrices.',
      results: 'Obtained 85% validation accuracy with optimized hyperparameters, identifying key genomic features driving cellular pathway differentiation.'
    },
    chips: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'Hyperparameter Tuning'],
    github: 'https://github.com/Naydhurve3',
    color: '#a855f7',
    accentColor: '#10b981'
  }
];

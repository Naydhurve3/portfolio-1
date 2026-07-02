export const projects = [
  {
    id: 'cosmoguide',
    tag: '01 / AI & RAG',
    title: 'CosmoGuide – Space Exploration Cockpit',
    metricValue: '11 AI Providers',
    metricLabel: 'Multi-Model Routing System',
    description: 'Self-directed project focused on mastering RAG pipelines, multi-LLM routing, and AI integration. Built the core AI architecture — FAISS vector search, LangChain retrieval, 11-provider LLM routing with cascading fallback, and NASA APOD API integration.',
    caseStudy: {
      problem: 'Space education tools are either static websites with no interactivity or require deep technical knowledge. Wanted to learn how to build a production-grade multi-LLM system with real-time data integration.',
      solution: 'Designed and built the AI/ML backend — FAISS vector embeddings for semantic search, LangChain retrieval pipeline, multi-provider routing across Gemini, Groq, Anthropic, OpenRouter, NVIDIA NIM, and more with automatic fallback. Integrated NASA APOD API for live astronomy data. Used references for the React 19 frontend and Express.js proxy layer.',
      results: 'Live at cosmo-guide-eta.vercel.app. Supports 11 AI providers with sub-second query responses, 3D orbital simulations, and a hybrid API key model where users can bring their own keys or use the demo fallback.'
    },
    chips: ['Python', 'FAISS', 'LangChain', 'Gemini API', 'Groq', 'RAG', 'React', 'Express.js', '3D Canvas'],
    github: 'https://github.com/Naydhurve3/CosmoGuide',
    live: 'https://cosmo-guide-eta.vercel.app/',
    color: '#818cf8',
    accentColor: '#10b981'
  },
  {
    id: 'atm-simulation',
    tag: '02 / ML ENGINEERING',
    title: 'ATM & Banking Ecosystem v3.0',
    metricValue: '20 ML/DL Models',
    metricLabel: 'Full Banking Analytics Suite',
    description: 'Personal sandbox project to experiment with 20 different ML/DL models on real RBI banking data. Built a complete data pipeline from data ingestion to model evaluation, practicing feature engineering, hyperparameter tuning, and end-to-end deployment.',
    caseStudy: {
      problem: 'Wanted a real-world dataset to practice applying diverse ML/DL algorithms — from forecasting to anomaly detection to classification — in a single cohesive project.',
      solution: 'Ingested real RBI monthly ATM/card statistics from 65 Indian banks. Built 20 ML/DL models: Prophet cash demand forecaster, XGBoost transaction predictor, LSTM deep learning, Isolation Forest anomaly detection, Gradient Boosting credit scorer, and more. Implemented a complete ATM simulator with fraud detection, user KYC system, and multi-account passbook generation.',
      results: 'Delivered a complete banking analytics platform with 20 production-grade ML models, real RBI data pipeline, ATM simulation with real-time fraud scoring, and interactive Flask dashboard with 5 pages.'
    },
    chips: ['Python', 'Scikit-learn', 'XGBoost', 'Prophet', 'TensorFlow/Keras', 'Flask', 'Plotly', 'Pandas', 'SQLite'],
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
    description: 'End-to-end workforce analytics internship project — cleaning 3,000+ employee records across 26 attributes, building 15 analytical deep-dives, and an interactive Power BI dashboard for attrition and performance insights.',
    caseStudy: {
      problem: 'HR teams work with incomplete, siloed employee data. Missing values, inconsistent formats, and unstandardized fields hide attrition drivers, compensation inequities, and diversity gaps.',
      solution: 'Designed a three-tier imputation strategy validated with KDE checks. Engineered derived features (JobFamily, SeniorityLevel, AgeGroup, TenureDays). Produced 15 Jupyter notebook reports covering attrition, diversity, compensation equity, performance, career progression, HiPo identification, workforce planning, training ROI, and recruitment analysis.',
      results: '3 versioned clean datasets, 15 domain-specific analysis notebooks, 9 publication-quality figures, and an interactive Power BI executive dashboard. Identified 49 high-potential employees and mapped retention drivers by department and seniority.'
    },
    chips: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'Matplotlib', 'Seaborn', 'Jupyter', 'Feature Engineering'],
    github: 'https://github.com/Naydhurve3/WorkForce-Data-Analysis',
    color: '#ef4444',
    accentColor: '#818cf8'
  }
];

export const secondaryProjects = [
  {
    id: 'liver-cancer',
    tag: 'COMPUTER VISION',
    title: 'Liver Cancer Detection (CNN)',
    metricValue: 'CT Scan Analysis',
    metricLabel: 'Tumor Detection Pipeline',
    description: 'CNN-based tumor classification on CT scans using transfer learning with VGG16 and ResNet50 architectures.',
    chips: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'ResNet50', 'VGG16'],
    github: 'https://github.com/Naydhurve3/LIVER-CT-SCAN-DATASET',
    color: '#ef4444'
  },
  {
    id: 'movie-recommender',
    tag: 'NLP',
    title: 'Movie Recommendation System',
    metricValue: '5,000+ Movies',
    metricLabel: 'Metadata Records Analyzed',
    description: 'Content-based filtering using TF-IDF vectorization and cosine similarity on NLP-processed movie metadata via Flask.',
    chips: ['Python', 'Scikit-learn', 'NLTK', 'Flask', 'Pandas', 'Pickle'],
    github: 'https://github.com/Naydhurve3/MOVIE-RECOMMENDATION-SYSTEM',
    color: '#818cf8'
  },
  {
    id: 'stem-cell',
    tag: 'BIOINFORMATICS',
    title: 'Stem Cell Outcome Prediction',
    metricValue: 'Gene Expression',
    metricLabel: 'Stem Cell Classification',
    description: 'Hybrid ensemble models (DNN + Random Forest) predicting stem cell differentiation pathways with hyperparameter optimization.',
    chips: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/Naydhurve3',
    color: '#a855f7'
  }
];

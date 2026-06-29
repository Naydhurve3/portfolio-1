import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, Send, Settings, User } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

  const RAG_DOCUMENTS = [
    {
      id: "profile_summary",
      title: "Profile & Identity",
      content: "Nayan Dhurve is a Data Science and AI Engineer graduate from Yeshwantrao Chavan College of Engineering (YCCE), Nagpur (B.Tech IT, 2021-2025) with a CGPA of 8.4/10. He specializes in designing robust machine learning pipelines, deep learning models, and Retrieval-Augmented Generation (RAG) agent systems."
    },
    {
      id: "project_cosmoguide",
      title: "CosmoGuide — Space Exploration Cockpit",
      content: "CosmoGuide is Nayan's flagship project — an interactive space exploration web app (React 19, TypeScript, Vite 6, Tailwind CSS 4.1) with an Express.js backend serving as a proxy to 11 AI providers (Gemini, Groq, Anthropic, OpenRouter, NVIDIA NIM, Together AI, DeepSeek, Mistral, Cohere, Perplexity, HuggingFace). Features a 3D Kepler orbital simulator, heliophysics space weather tracking, interactive star charts, astronomy quiz engine, generative AI space art (Astro Vision), mission control with live launch countdowns, and a Hubble Birthday Time Machine. Uses a hybrid API key model — users can bring their own keys for unlimited access or use the server demo fallback (50 req/day). Live at cosmoguide.onrender.com."
    },
    {
      id: "project_atm_simulation",
      title: "ATM & Banking Ecosystem v3.0",
      content: "A comprehensive banking ecosystem (Python) featuring real RBI data from 65 Indian banks. Includes 20 ML/DL models (Prophet cash demand forecasting, XGBoost transaction prediction, LSTM deep learning, Isolation Forest anomaly detection, Gradient Boosting credit scoring). Has a working ATM simulator (withdraw, deposit, transfer, fraud detection), full user system with age-aware KYC, multi-account passbook generation (PNG/PDF), and a Flask/Plotly web dashboard with 5 pages."
    },
    {
      id: "project_hr_analytics",
      title: "WorkForce Data Analysis",
      content: "Nayan's data analytics internship project at ICEICO Technologies (Jan-Jul 2025). Built an end-to-end workforce analytics pipeline cleaning 3,000+ employee records across 26 attributes. Used a three-tier imputation strategy validated with KDE distribution checks. Produced 15 domain-specific analytical deep-dives covering attrition, diversity, compensation equity, performance management, career progression, HiPo identification, workforce planning, training ROI, and recruitment. Built an interactive Power BI dashboard for executive decision-making."
    },
    {
      id: "project_liver_cancer",
      title: "Liver Cancer Detection (CNN Project)",
      content: "A MedTech deep learning project (Sep-Oct 2023) built in TensorFlow and Keras. Nayan fine-tuned ResNet50 and VGG16 model weights on abdominal CT scan slices, using OpenCV CLAHE contrast adjustments and data augmentation for pre-processing. Achieved 89.24% tumor classification accuracy."
    },
    {
      id: "project_stem_cells",
      title: "Stem Cell Prediction (Bioinformatics)",
      content: "Nayan built a hybrid ensemble classification pipeline (Jul-Nov 2024) combining Deep Neural Networks (DNN) with Scikit-learn Random Forests to predict stem cell differentiation pathways. Managed high-dimensional gene expression matrices with hyperparameter optimization, achieving 85.00% validation accuracy."
    },
    {
      id: "project_movie_recommender",
      title: "Movie Recommender (NLP Project)",
      content: "A content-based recommendation Flask web application (Jan-Feb 2024) analyzing 5,000+ movies. It computes vector similarity via TF-IDF matrices and Cosine Distance on NLTK tokenized plot summaries, successfully resolving cold-start recommendation issues."
    },
    {
      id: "skills_summary",
      title: "Core Skills & Tech Stack",
      content: "Core Stack: Python, SQL, C, HTML/CSS, JavaScript, TypeScript. AI/ML: Machine Learning, Deep Learning, CNN, RAG, LLM integrations. Frameworks: TensorFlow, Keras, PyTorch, Scikit-learn, LangChain, FAISS, Pandas, NumPy, Matplotlib, Seaborn, Power BI, Streamlit, Flask, FastAPI, Express.js, Docker."
    },
    {
      id: "certifications",
      title: "Certifications",
      content: "Certifications: 100 Days of Python (Udemy), Data Science Course (CodeWithHarry), Machine Learning with Python, Python for DS & AI, Tata GenAI Powered Data Analytics."
    },
    {
      id: "contact_info",
      title: "Contact Details",
      content: "Contact channels: Email nayankdhurve@gmail.com, Phone +91-8788577239. Profile links: GitHub github.com/Naydhurve3, LinkedIn www.linkedin.com/in/nayan-dhurve-31815a258."
    }
  ];

export default function Playground() {
  const [messages, setMessages] = useState([
    { text: "Hi, I am Nayan's virtual RAG assistant! Ask me any details about his skills, projects, experience, or education. Try the quick prompts or enter your own.", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [trace, setTrace] = useState([
    { title: "Awaiting Query", detail: "Enter a prompt to initialize retrieval." }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [jdInput, setJdInput] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [matchFeedback, setMatchFeedback] = useState('');

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveSettings = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      alert("Gemini API key saved in local storage!");
    } else {
      localStorage.removeItem('gemini_api_key');
      alert("API key cleared. RAG will fall back to local rule retrieval.");
    }
    setShowSettings(false);
  };

  const retrieveContext = (query, topK = 3) => {
    const stopWords = new Set(["what", "is", "a", "an", "the", "he", "his", "in", "on", "at", "about", "for", "with", "does", "nayan", "dhurve"]);
    const queryWords = query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w));
    
    const scoredDocs = RAG_DOCUMENTS.map(doc => {
      let score = 0;
      const text = (doc.title + " " + doc.content).toLowerCase();
      queryWords.forEach(word => {
        if (text.includes(word)) {
          score += 1.0;
          if (doc.title.toLowerCase().includes(word)) {
            score += 1.5;
          }
        }
      });
      return { doc, score };
    });

    let results = scoredDocs
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (results.length === 0) {
      results = [{ doc: RAG_DOCUMENTS[0], score: 0.1 }];
    }

    return results.slice(0, topK);
  };

  const localFallbackSynthesis = (query, matched) => {
    const bestMatch = matched[0].doc;
    const intro = `*(Retrieved from Nayan's ${bestMatch.title} chunk)*:\n\n`;
    
    if (bestMatch.id === "profile_summary") {
      return intro + "Nayan Dhurve is an IT B.Tech graduate (2021-2025) from YCCE Nagpur. He holds an 8.4/10 CGPA and is an AI Engineer specializing in deep learning, LLM pipelines, and full-stack software development.";
    }
    if (bestMatch.id === "project_cosmoguide") {
      return intro + "Nayan built CosmoGuide — a full space exploration cockpit (React 19, TypeScript, Express.js) with 11 AI providers (Gemini, Groq, Anthropic, OpenRouter, NVIDIA, Together, DeepSeek, Mistral, Cohere, Perplexity, HuggingFace). Features 3D Kepler orbital sim, space weather tracker, star chart, quiz engine, generative AI art, and Hubble Time Machine. Live at cosmoguide.onrender.com.";
    }
    if (bestMatch.id === "project_atm_simulation") {
      return intro + "Nayan built an ATM & Banking Ecosystem with 20 ML/DL models using real RBI data from 65 Indian banks. Includes ATM simulator with fraud detection, user KYC system, credit scoring, Prophet forecasting, XGBoost prediction, LSTM deep learning, and a Flask/Plotly web dashboard.";
    }
    if (bestMatch.id === "project_liver_cancer") {
      return intro + "He engineered a MedTech Deep Learning CNN classifier (Sep-Oct 2023) to detect tumors in CT scan slices. Fine-tuned VGG16/ResNet50 models in TensorFlow with data augmentation, achieving 89.24% validation accuracy.";
    }
    if (bestMatch.id === "project_stem_cells") {
      return intro + "Nayan developed a stem cell lineage commitment classifier (Jul-Nov 2024) combining Deep Neural Networks with Scikit-learn Random Forests with hyperparameter optimization, reaching 85% accuracy on high-dimensional genomic matrices.";
    }
    if (bestMatch.id === "project_movie_recommender") {
      return intro + "He designed a content-based Flask recommendation engine (Jan-Feb 2024) indexing over 5,000 films. Computed cosine similarity vectors of TF-IDF plot descriptions, bypassing recommender cold-start limitations.";
    }
    if (bestMatch.id === "project_hr_analytics") {
      return intro + "During his Data Analytics internship at ICEICO (Jan-Jul 2025), he built a workforce analytics pipeline cleaning 3,000+ employee records across 26 attributes. Produced 15 domain reports covering attrition, diversity, compensation, performance, and more, plus a Power BI executive dashboard.";
    }
    if (bestMatch.id === "skills_summary") {
      return intro + "Nayan's tech stack includes Python, SQL, C, TypeScript, Machine Learning, Deep Learning (CNNs), RAG pipelines, LangChain, FAISS, TensorFlow, PyTorch, Scikit-learn, Power BI, Streamlit, Flask, Express.js, and Docker.";
    }
    if (bestMatch.id === "certifications") {
      return intro + "His certifications include 100 Days of Python (Udemy), Data Science Course (CodeWithHarry), Machine Learning with Python, Python for DS & AI, and Tata GenAI Powered Data Analytics.";
    }
    if (bestMatch.id === "contact_info") {
      return intro + "You can contact Nayan at nayankdhurve@gmail.com or call him at +91-8788577239. Find his code on GitHub (Naydhurve3) and connect on LinkedIn (Nayan Dhurve).";
    }

    return "I'm not fully sure of that. Feel free to ask about Nayan's 'skills', 'experience', 'projects' (like CosmoGuide or Liver Cancer detection), 'education', or 'contact details'!";
  };

  const executeRAGPipeline = async (query) => {
    const steps = [];
    steps.push({ title: "1. Query Received", detail: `Query: "${query.substring(0, 45)}${query.length > 45 ? '...' : ''}"` });
    setTrace([...steps]);

    await new Promise(r => setTimeout(r, 400));
    const matched = retrieveContext(query);
    const matchedTitles = matched.map(m => `${m.doc.title} (${m.score.toFixed(1)})`);
    
    steps.push({ title: "2. Document Retrieval", detail: `Matched ${matched.length} knowledge chunks from FAISS emulation index.`, tags: matchedTitles });
    setTrace([...steps]);

    await new Promise(r => setTimeout(r, 450));
    const contextText = matched.map(m => `Chunk [${m.doc.title}]: ${m.doc.content}`).join("\n");
    
    steps.push({ title: "3. Context Prompt Synthesis", detail: `Formatted prompt payload with ${contextText.length} characters of grounding data.` });
    setTrace([...steps]);

    await new Promise(r => setTimeout(r, 400));
    const key = localStorage.getItem('gemini_api_key');

    if (key) {
      steps.push({ title: "4. Gemini API Call", detail: "Sending context-grounded request to Gemini 1.5 Flash API..." });
      setTrace([...steps]);
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Nayan's portfolio assistant. Answer the user's question accurately using ONLY the context facts provided. Keep the response friendly, professional, and concise. Do not guess or hallucinate.
                
                Context Facts:
                ${contextText}
                
                Question: ${query}`
              }]
            }]
          })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          steps.push({ title: "5. Answer Generated", detail: "Successfully synthesized live LLM response." });
          setTrace([...steps]);
          return data.candidates[0].content.parts[0].text.trim();
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e) {
        steps.push({ title: "4. API Error", detail: "Gemini API call failed. Falling back to local retriever." });
        setTrace([...steps]);
        return localFallbackSynthesis(query, matched);
      }
    } else {
      steps.push({ title: "4. Local Search Fallback", detail: "No API key found. Synthesizing answer locally..." });
      setTrace([...steps]);
      await new Promise(r => setTimeout(r, 400));
      steps.push({ title: "5. Answer Generated", detail: "Synthesized response locally." });
      setTrace([...steps]);
      return localFallbackSynthesis(query, matched);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputText('');
    setTyping(true);
    const reply = await executeRAGPipeline(text);
    setTyping(false);
    setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
  };

  const analyzeJobFit = () => {
    const jdText = jdInput.toLowerCase().trim();
    if (!jdText) {
      alert("Please paste a job description first.");
      return;
    }

    const skillsDB = [
      { kw: "python", weight: 15 },
      { kw: "sql", weight: 10 },
      { kw: "machine learning", weight: 10 },
      { kw: "deep learning", weight: 10 },
      { kw: "cnn", weight: 8 },
      { kw: "rag", weight: 12 },
      { kw: "llm", weight: 12 },
      { kw: "langchain", weight: 10 },
      { kw: "power bi", weight: 8 },
      { kw: "streamlit", weight: 5 },
      { kw: "flask", weight: 5 },
      { kw: "tensorflow", weight: 8 },
      { kw: "keras", weight: 5 },
      { kw: "pytorch", weight: 8 },
      { kw: "scikit-learn", weight: 8 },
      { kw: "faiss", weight: 5 },
      { kw: "pandas", weight: 5 },
      { kw: "numpy", weight: 5 },
      { kw: "docker", weight: 5 },
      { kw: "c", weight: 3 },
      { kw: "seaborn", weight: 3 },
      { kw: "matplotlib", weight: 3 },
      { kw: "xgboost", weight: 8 },
      { kw: "random forest", weight: 8 },
      { kw: "neural network", weight: 8 }
    ];

    let score = 30;
    let matchedList = [];

    skillsDB.forEach(item => {
      if (jdText.includes(item.kw)) {
        score += item.weight;
        matchedList.push(item.kw.toUpperCase());
      }
    });

    if (score > 100) score = 100;
    if (score < 40) score = 40;

    setMatchScore(0);
    let currentVal = 0;
    const interval = setInterval(() => {
      currentVal += 2;
      if (currentVal >= score) {
        setMatchScore(score);
        clearInterval(interval);
      } else {
        setMatchScore(currentVal);
      }
    }, 15);

    if (score >= 80) {
      setMatchFeedback(`Strong Match! Nayan's expertise matches key JD skills: ${matchedList.slice(0, 5).join(', ')}. His RAG space companion and liver cancer detection models directly align with your requirements.`);
    } else if (score >= 60) {
      setMatchFeedback(`Good Match! Key overlap detected in: ${matchedList.slice(0, 4).join(', ')}. Nayan has solid Python preprocessing and analytical model experience that matches this position.`);
    } else {
      setMatchFeedback(`Moderate Match (40%). Found overlap in: ${matchedList.join(', ') || 'General IT'}. Nayan has a strong mathematical foundation and Python background, making him a quick study to close any tech stack gaps.`);
    }
  };

  return (
    <section id="playground" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.span className="section-num" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          09 / interact
        </motion.span>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          AI Playground
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Terminal Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              background: '#08080a',
              border: '1px solid #1c1c24',
              borderRadius: 'var(--radius-lg)',
              height: '540px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--card-shadow)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              background: '#111116',
              padding: '0.85rem 1.4rem',
              borderBottom: '1px solid #1c1c24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 5
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Nayan's RAG Assistant
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Settings size={14} /> Settings
              </button>
            </div>

            {/* Settings Modal overlay inside terminal */}
            {showSettings && (
              <div style={{
                position: 'absolute',
                top: '45px',
                left: 0,
                right: 0,
                background: '#111116',
                borderBottom: '1px solid #1c1c24',
                padding: '1.2rem',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <h4 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>RAG Engine Configuration</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', width: '110px', fontFamily: 'var(--font-mono)' }}>Gemini API Key:</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    style={{
                      flexGrow: 1,
                      background: '#08080a',
                      border: '1px solid #27272a',
                      borderRadius: '6px',
                      padding: '0.35rem 0.6rem',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none'
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  Key is saved locally in your browser cache. Requests are sent directly to official Google API endpoints.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowSettings(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={saveSettings}>Save Config</button>
                </div>
              </div>
            )}

            {/* Split screen body */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              {/* Chat pane */}
              <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1c1c24', background: '#09090b' }}>
                <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'user' ? 'var(--accent)' : '#18181b',
                        color: msg.sender === 'user' ? '#fff' : 'var(--text)',
                        border: msg.sender === 'user' ? 'none' : '1px solid #27272a',
                        padding: '0.65rem 0.95rem',
                        borderRadius: '12px',
                        maxWidth: '85%',
                        fontSize: '0.8rem',
                        lineHeight: 1.5,
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {typing && (
                    <div style={{ alignSelf: 'flex-start', background: '#18181b', border: '1px solid #27272a', padding: '0.65rem 0.95rem', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#71717a', animation: 'pulse-dot 1.2s infinite' }} />
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#71717a', animation: 'pulse-dot 1.2s infinite 0.2s' }} />
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#71717a', animation: 'pulse-dot 1.2s infinite 0.4s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* RAG pipeline trace panel */}
              <div style={{ width: '40%', height: '100%', background: '#040406', padding: '1.2rem', overflowY: 'auto' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #1c1c24',
                  paddingBottom: '0.4rem',
                  marginBottom: '0.85rem'
                }}>RAG PIPELINE TRACE</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {trace.map((t, i) => (
                    <div key={i} style={{ borderLeft: '1.5px solid #27272a', paddingLeft: '0.75rem', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-4.5px',
                        top: '4px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        boxShadow: '0 0 6px var(--accent)'
                      }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: '#d4d4d8' }}>{t.title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#8e8e9c', marginTop: '0.15rem' }}>{t.detail}</div>
                      {t.tags && t.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          display: 'inline-block',
                          background: '#0f0f15',
                          border: '1px solid #27272a',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '5px',
                          color: '#a1a1aa',
                          fontSize: '0.58rem',
                          marginRight: '0.25rem',
                          marginTop: '0.25rem'
                        }}>{tag}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick questions list */}
            <div style={{
              padding: '0.6rem 1rem',
              borderTop: '1px solid #1c1c24',
              background: '#08080a',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem'
            }}>
              {[
                { label: 'Summarize Experience', query: "Summarize Nayan's experience in 30s." },
                { label: 'RAG Projects', query: "Which project demonstrates RAG?" },
                { label: 'ICEICO Internship', query: "What ML models did he use at ICEICO?" },
                { label: 'Contact Info', query: "How to contact Nayan?" }
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(btn.query)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid #27272a',
                    background: '#121217',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.borderColor = '#27272a'; e.target.style.color = '#a1a1aa'; }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid #1c1c24',
              background: '#111116',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                placeholder="Type a message or command..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(inputText); }}
                style={{
                  flexGrow: 1,
                  background: '#0a0a0c',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  padding: '0.45rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => handleSend(inputText)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>

          {/* Job Match Analyzer Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Interactive Demos</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Recruiters can test Nayan's profile match percentage against specific requirements. Paste a JD summary below.
            </p>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👔 Job Match Analyzer
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <textarea
                  placeholder="Paste job description details (e.g., python, machine learning, sql, deep learning, RAG, Power BI)..."
                  value={jdInput}
                  onChange={e => setJdInput(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '110px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                
                <button className="btn btn-primary" onClick={analyzeJobFit} style={{ justifyContent: 'center' }}>
                  Analyze Match
                </button>

                {matchScore !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: '3px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: 'var(--accent)',
                      flexShrink: 0
                    }}>
                      {matchScore}%
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {matchFeedback}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @media (max-width: 768px) {
          #playground .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

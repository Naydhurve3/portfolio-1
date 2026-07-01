# Future Features — Preserved Sections

This document tracks portfolio sections that are implemented but currently hidden from the live site. They are kept in the codebase for easy re-activation when the right conditions are met.

---

## 1. Testimonials / Endorsements

| Field | Value |
|-------|-------|
| **Component** | `src/components/sections/Testimonials.jsx` |
| **Data** | `testimonials` export in `src/data/experience.js` |
| **Nav ID** | `testimonials` |
| **Section Num** | `05 / feedback` |

### Re-activate when
Real endorsements are collected from:
- ICEICO Technologies mentor/supervisor
- YCCE faculty or project guide
- Industry professionals who have reviewed your work

### How to activate
1. Uncomment `import Testimonials from ...` in `src/App.jsx`
2. Uncomment `<Testimonials />` in the JSX main section
3. Optionally add `{ id: 'testimonials', label: 'Endorsements' }` back to `Navbar.jsx`
4. Update testimonial data in `src/data/experience.js`

---

## 2. Achievements / Milestones

| Field | Value |
|-------|-------|
| **Component** | `src/components/sections/Achievements.jsx` |
| **Data** | `achievements` export in `src/data/experience.js` |
| **Nav ID** | `achievements` |
| **Section Num** | `07 / metrics` |

### Re-activate when
Concrete, verifiable achievements exist:
- Competition wins (Kaggle, hackathons)
- Published research papers or conference presentations
- Awards or recognitions from reputable organizations
- Significant open-source contributions (merged PRs in notable projects)

### How to activate
1. Uncomment `import Achievements from ...` in `src/App.jsx`
2. Uncomment `<Achievements />` in the JSX main section
3. Add `{ id: 'achievements', label: 'Milestones' }` back to `Navbar.jsx`
4. Update achievements data in `src/data/experience.js`

---

## 3. Blog / Articles

| Field | Value |
|-------|-------|
| **Component** | `src/components/sections/Blog.jsx` |
| **Data** | `blogArticles` export in `src/data/experience.js` |
| **Nav ID** | `blog` |
| **Section Num** | `06 / writings` |

### Re-activate when
Original technical articles are published on:
- Medium / Dev.to / Hashnode
- Personal blog
- LinkedIn articles

### How to activate
1. Uncomment `import Blog from ...` in `src/App.jsx`
2. Uncomment `<Blog />` in the JSX main section
3. Add `{ id: 'blog', label: 'Blog' }` back to `Navbar.jsx`
4. Update blog article data in `src/data/experience.js`

---

## 4. AI Playground (RAG Chatbot)

| Field | Value |
|-------|-------|
| **Component** | `src/components/sections/Playground.jsx` |
| **Data** | `RAG_DOCUMENTS` constant (inline in component) |
| **Nav ID** | `playground` |
| **Section Num** | `09 / interact` |

### Re-activate when
- You want to showcase the interactive RAG chatbot to recruiters
- The RAG documents in Playground.jsx are reviewed and up to date
- A valid Gemini API key workflow is documented

### How to activate
1. Uncomment `import Playground from ...` in `src/App.jsx`
2. Uncomment `<Playground />` in the JSX main section
3. Add `{ id: 'playground', label: 'Playground' }` back to `Navbar.jsx`
4. Verify RAG_DOCUMENTS content in Playground.jsx reflects current data

---

## File Preservation Summary

All component files remain in the codebase untouched:

```
src/components/sections/Testimonials.jsx   ← preserved
src/components/sections/Blog.jsx           ← preserved
src/components/sections/Achievements.jsx   ← preserved
src/components/sections/Playground.jsx     ← preserved
```

All data exports remain in `src/data/experience.js`:

```
testimonials  ← preserved (2 entries)
blogArticles  ← preserved (3 entries)
achievements  ← preserved (3 entries)
```

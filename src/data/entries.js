// Field Notebook entry metadata
//
// Drives the notebook navigation/progress UI. Each entry is a numbered
// section in the journey. `sectionId` maps to the DOM id of the section
// in App.jsx — all ids confirmed against the individual components:
//   home          → HomeNew.jsx
//   signl         → SignlFeature.jsx
//   safety-eval   → SafetyEvalCaseStudy.jsx
//   experience    → Experience.jsx
//   about         → About.jsx
//   skills        → Skills.jsx
//   work          → Work.jsx
//   contact       → Contacts.jsx

export const ENTRIES = [
  { num: '01', name: 'Hello',        eyebrow: '→ Entry 01 · Hello',         sectionId: 'home' },
  { num: '02', name: 'Building now', eyebrow: '→ Entry 02 · Building now',  sectionId: 'signl' },
  { num: '03', name: 'Case file',    eyebrow: '→ Entry 03 · Case file',     sectionId: 'safety-eval' },
  { num: '04', name: 'On the job',   eyebrow: '→ Entry 04 · On the job',    sectionId: 'experience' },
  { num: '05', name: 'About me',     eyebrow: '→ Entry 05 · About me',      sectionId: 'about' },
  { num: '06', name: 'The bench',    eyebrow: '→ Entry 06 · The bench',     sectionId: 'skills' },
  { num: '07', name: 'Past work',    eyebrow: '→ Entry 07 · Past work',     sectionId: 'work' },
  { num: '08', name: 'Open shop',    eyebrow: '→ Entry 08 · Open shop',     sectionId: 'contact' },
];

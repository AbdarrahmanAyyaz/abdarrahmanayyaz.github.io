import React from 'react';
import Navbar from './components/navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './components/HomeNew';
import SignlFeature from './components/SignlFeature';
import SafetyEvalCaseStudy from './components/SafetyEvalCaseStudy';
import Experience from './components/Experience';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import SectionTransition from './components/ui/SectionTransition';
import { ToastProvider } from './components/ui/Toast';
import './styles/responsive.css';

export default function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-white focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to content
      </a>
      <ScrollProgressBar />
      <ToastProvider>
      <Navbar />
      <Home />
      <SectionTransition toEntryId="signl" />
      <SignlFeature />
      <SectionTransition toEntryId="safety-eval" />
      <SafetyEvalCaseStudy />
      <SectionTransition toEntryId="experience" />
      <Experience />
      <SectionTransition toEntryId="about" />
      <About />
      <SectionTransition toEntryId="skills" />
      <Skills />
      <SectionTransition toEntryId="work" />
      <Work />
      <SectionTransition toEntryId="contact" />
      <Contacts />
      <Footer />
    </ToastProvider>
    </>
  );
}
import React from 'react';
import Navbar from './components/navbar';
import ProgressIndicators from './components/ProgressIndicators';
import Home from './components/HomeNew';
import SignlFeature from './components/SignlFeature';
import SafetyEvalCaseStudy from './components/SafetyEvalCaseStudy';
import Experience from './components/Experience';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { ToastProvider } from './components/ui/Toast';
import './styles/responsive.css';

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <ProgressIndicators />
      <Home />
      <SignlFeature />
      <SafetyEvalCaseStudy />
      <Experience />
      <About />
      <Skills />
      <Work />
      <Contacts />
      <Footer />
    </ToastProvider>
  );
}
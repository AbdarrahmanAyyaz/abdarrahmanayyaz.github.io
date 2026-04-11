import React from 'react';
import Navbar from './components/navbar';
import ProgressIndicators from './components/ProgressIndicators';
import Home from './components/HomeNew';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contacts from './components/Contacts';
import { ToastProvider } from './components/ui/Toast';
import './styles/responsive.css';

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <ProgressIndicators />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contacts />
    </ToastProvider>
  );
}
import React from 'react';
import Navbar from './components/navbar';
import SocialRail from './components/socialRail';
import BottomDock from './components/BottomDock';
import Home from './components/Home';
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
      <SocialRail />
      <BottomDock />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contacts />
    </ToastProvider>
  );
}
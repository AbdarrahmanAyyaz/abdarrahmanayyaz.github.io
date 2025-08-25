import React from 'react';
import Navbar from './components/navbar';
import SocialRail from './components/socialRail';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contacts from './components/Contacts';

export default function App() {
  return (
    <>
      <Navbar />
      <SocialRail />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contacts />
    </>
  );
}
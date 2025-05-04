import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

// Updated hero section that emphasises AI and cloud troubleshooting
// This component preserves the original styling but tweaks the headline
// and description to highlight your experience with AI and Oracle Cloud.

const Home = () => {
  return (
    <div name='home' className='w-full h-screen bg-[#0a192f]'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <p className="text-[#ff5757]">Hi, my name is,</p>
        <h1 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">Abdarrahman Ayyaz</h1>
        {/* Updated headline emphasising AI and cloud */}
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
          AI Enthusiast &amp; Cloud Troubleshooter
        </h2>
        {/* Updated description to mention machine‑learning apps and Oracle Cloud */}
        <p className="text-[#8892b0] py-4 max-w-[700px]">
          I&#39;m a software developer with a passion for building machine‑learning applications and
          supporting clients on Oracle Cloud Infrastructure (OCI). I enjoy exploring the latest
          AI technologies, deploying full‑stack AI apps and troubleshooting cloud solutions.
        </p>
        <div>
          <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-[#ff5757] hover:border-[#ff5757]">
            View Projects
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight className="ml-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
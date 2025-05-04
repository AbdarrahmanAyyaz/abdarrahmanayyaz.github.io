import React from 'react';

// Updated About section to include AI and cloud experience

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <div className='sm:text-right pb-8 pl-4'>
            <p className='text-4xl font-bold inline border-b-4 border-[#ff5757]'>
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
          <div className='sm:text-right text-4xl font-bold'>
            <p>Welcome! Please take a look around.</p>
          </div>
          <div>
            {/* Motto emphasising consistency, focus and discipline */}
            <p className='pb-2'>
              <span className='text-[#ff5757] font-bold'>CON-FO-DI</span> – CONSistency cultivates habits. FOcus provides drive. DIscipline
              builds foundation. It is not just an acronym; it is a way of life.
            </p>
            {/* New paragraph highlighting AI and cloud experience */}
            <p className='pb-2'>
              I build and deploy machine‑learning solutions, troubleshoot cloud workloads and
              support clients on Oracle Cloud Infrastructure. As an AI enthusiast, I enjoy
              experimenting with the latest models and frameworks while designing scalable,
              full‑stack applications.
            </p>
            <p>
              Outside of work I like to spend time with family and connect with nature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'

const Home = () => {
  return (
    <div name='home' className='w-full h-screen bg-[#0a192f]'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
            <p className='text-[#ff5757]'>Hi, my name is</p>
            <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6]'>Abdarrahman Ayyaz</h1>
            <h2 className='text-4xl sm:text-7xl font-bold text-[#8892b0]' >I'm a Software Developer.</h2>
            <p className='text-[8892b0] py-4 max-w-[700px]'>I'm a software devloper that enjoys learning new technologies and providing my clients with the best technological solutions. Currently, I'm focused on building responsive full-stack web applications.</p>
        <div>
            <button className='text-white border-2 px-6 py-3 my-2 flex items-center hover:bg-[#ff5757] hover:border-[#ff5757]'>View Work <HiArrowNarrowRight /></button>
        </div>
        </div>
    </div>
  )
}
export default Home
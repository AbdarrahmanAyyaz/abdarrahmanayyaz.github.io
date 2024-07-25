import React from 'react'

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
          <p>Hi. I'm Abdarrahman Ayyaz, nice to meet you. Please take a look around.</p>
        </div>
        <div>
          <p> "CON-FO-DI"<br></br><br></br> CONsistency cultivates habits. FOcus provides drive. DIscipline builds foundation. 

It is not just an acronym, it is a way of life. I am a software developer with a passion for serving others and making a positive impact in the tech industry. Outside of work I like to spend time with family and connect with nature.</p>  
        </div>
      </div>
  </div>
</div>
);
}

export default About
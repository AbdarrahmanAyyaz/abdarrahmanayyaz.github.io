import React from 'react';

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
        <form method='POST' action="https://getform.io/f/anlenwga" target="_blank" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <br></br>
                <p className='text-4xl font-bold inline border-b-4 border-[#ff5757] text-gray-300'>Contact</p>
                <p className='text-gray-300 py-4'>// Submit the form below or shoot me an email - abdarrahmanayyaz00@gmail.com</p>
            </div>
            <input className='bg-[#ccd6f6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5757] focus:border-transparent w-full' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#ccd6f6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5757] focus:border-transparent w-full' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#ccd6f6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5757] focus:border-transparent w-full' name="message" rows="10" placeholder='Message'></textarea>
            <button className='text-white border-2 hover:bg-[#ff5757] hover:border-[#ff5757] px-4 py-3 my-8 mx-auto flex items-center rounded-md'>Let's Collaborate</button>
        </form>
    </div>
  )
}

export default Contact;

import React from 'react'
import LandingPageImage  from "../assets/images/LandingPage.png"
import Navbar from '../components/Navbar'


function LandingPage() {
  return (
    <div className='h-screen w-screen flex flex-col  px-10' style={{backgroundImage:`url(${LandingPageImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
        <Navbar />
        <h1 className='font-bold text-4xl text-white boxshadow mt-40 mb-5'>
            Welcome to 
            <span className='text-black'>Ticket</span>
            <span className=' text-red-700'>Pay</span> 
            <br /><span className='ml-3 mt-2'>website</span> 
        </h1>   
        <h2 className='text-white text-lg font-semibold ml-6'>
            Here we provide you with quick  <br /> and convenient payment for 
            <br /> illegal violations
        </h2>
    </div>
  );
  
}

export default LandingPage
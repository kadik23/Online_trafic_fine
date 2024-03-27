import React from 'react'
import LandingPageImage  from "../assets/images/LandingPage.png"
import Navbar from '../components/Navbar'
import { motion } from "framer-motion";
import {
  textVariants,
  containerVariants,
} from "../data/animationConfig";


function LandingPage() {
  return (
    <div className='h-screen w-screen flex flex-col  px-10' style={{backgroundImage:`url(${LandingPageImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
        <Navbar />
        <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md:flex-[0 flex-[1] px-[1em] py-0 max-w-md:pb-[2em] max-w-md:text-center"
      >
          <motion.h1
            variants={textVariants}
            className="font-bold text-4xl text-white boxshadow mt-40 mb-5leading-[1.3] md:text-4xl"
          >
              Welcome to 
              <span className='text-black'>Ticket</span>
              <span className=' text-red-700'>Pay</span> 
              <br /><span className='ml-3 mt-2'>website</span>
          </motion.h1>
          <motion.h2 
            variants={textVariants}
            className='text-white text-lg font-semibold ml-6' >   
              Here we provide you with quick  <br /> and convenient payment for 
              <br /> illegal violations
          </motion.h2>
          <motion.button
            variants={textVariants}
            type='submit'
            className='px-5 py-2 mt-5 ml-5 text-white bg-[#4FD4B4] rounded-2xl hover:opacity-80 active:scale-105'
          >  
          Start Payment
          </motion.button>
      </motion.div>
    </div>
  );
  
}

export default LandingPage
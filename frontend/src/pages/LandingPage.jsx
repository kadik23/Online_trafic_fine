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
      </motion.div>
        {/* <h1 className='font-bold text-4xl text-white boxshadow mt-40 mb-5'>
            Welcome to 
            <span className='text-black'>Ticket</span>
            <span className=' text-red-700'>Pay</span> 
            <br /><span className='ml-3 mt-2'>website</span> 
        </h1>    */}
        {/* <h2 className='text-white text-lg font-semibold ml-6'>
        </h2> */}
    </div>
  );
  
}

export default LandingPage
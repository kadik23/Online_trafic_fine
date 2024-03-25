import React from 'react'
import Logo from '../assets/images/Logo.png'
import NavLinks from './NavLinks'
import { NavLink,useLocation } from 'react-router-dom'
  
function Navbar() {
  const location = useLocation();
  const path = location.pathname
  let className
  if (location.pathname === '/home') {
    className = 'bg-[#BEB1A6] bg-opacity-80 shadow-md shadow-[#BEB1A6]';
  }else{className=''}
  return (
    <div className={`w-screen h-16 flex justify-between items-center fixed top-0 left-0 z-20 px-10 ${className} `}>
        <NavLink to='/home'>
          <img src={Logo} alt="" />       
        </NavLink>
        <NavLinks/>
    </div>
    
  
  )
}

export default Navbar
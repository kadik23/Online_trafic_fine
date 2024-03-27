import React, { useState, useContext,useEffect } from 'react'
import Logo from '../assets/images/Logo.png'
import NavLinks from './NavLinks'
import { NavLink,useLocation } from 'react-router-dom'
import {UserContext} from "../contexts/userContext";

function Navbar() {
  const location = useLocation();
  const [redirectTo, setRedirectTo] = useState('')
  const { ready} = useContext(UserContext);
  useEffect(() => {
    if (ready) {
      setRedirectTo('home');
    }
  }, [ready]);
  const path = location.pathname
  let className
  if (location.pathname === '/home') {
    className = 'bg-[#BEB1A6] bg-opacity-80 shadow-md shadow-[#BEB1A6]';
  }else{className=''}
  return (
    <div className={`w-screen h-16 flex justify-between items-center fixed top-0 left-0 z-20 px-10 ${className} `}>
        <NavLink to={`/${redirectTo}`} className=' active:scale-105 hover:opacity-90'>
          <img src={Logo} alt="" />       
        </NavLink>
        <NavLinks/>
    </div>
    
  
  )
}

export default Navbar
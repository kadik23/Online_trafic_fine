import React from 'react'
import Logo from '../assets/images/Logo.png'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className='w-screen h-10 flex justify-between items-center fixed top-0 left-0 z-20 px-10'>
        <img src={Logo} alt="" />
        <div>
            <NavLink to="/sign_in" className=' text-white font-medium mr-8'>Login</NavLink>
            <NavLink to="/sign_up" className=' text-white font-medium'>Register</NavLink>
        </div>
    </div>
  
  )
}

export default Navbar
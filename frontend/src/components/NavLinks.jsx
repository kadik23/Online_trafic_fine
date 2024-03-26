import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  mobileNavContainerVariant,
  mobileNavListVariant,
  mobileNavExitProps,
} from "../data/animationConfig";
import {UserContext} from "../contexts/userContext";
import ToastContext from '../contexts/ToastContext';
import axios from "axios";
import Cookie from "js-cookie";

function NavLinks() {
  
  const Links = () => {
    return (
      <>
        <NavLink to="/sign_in" activeClassName="selected navlink" className='mr-6 active:scale-105 hover:opacity-80'>
          Login
        </NavLink>
  
        <NavLink to="/sign_up" activeClassName="selected navlink" className=' active:scale-105 hover:opacity-80' >
          Register
        </NavLink>
      </>
    );
  };

  const Logout = () => {
    return (
        <button onClick={handleLogout} activeClassName="selected navlink" className='mr-6'>
          Logout
        </button>
    );
  };

  const toastManager = useContext(ToastContext);
  const alertSuccessHandler = () => { toastManager.alertSuccess("Logout successful"); }
  const alertErroreHandler = () => { toastManager.alertError("Logout failed"); }
  const {user,setUser } = useContext(UserContext)

  
  const [redirect,setRedirect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout =async () =>{
    try{
      const {data} = await axios.post('/logout')
      Cookie.remove("token");
      alertSuccessHandler()
      setUser(null);
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    }catch(err){
      alertErroreHandler();
    }
  }

  if (redirect) {
    return window.location.href = '/';
  }
  return (
    <div className='text-white mr-12'>
      <nav className="flex flex-[1] items-center justify-end overflow-hidden text-white font-medium">
        {  user == null ? 
          <div className="hidden justify-end md:flex">
            <Links />
          </div>
          : 
          <div className="hidden justify-end md:flex active:scale-105 hover:opacity-75">
            <Logout />
          </div>
        }
        <div className="flex w-[75px] justify-end md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      { user == null ?

      <AnimatePresence >
        {isOpen && (
          <motion.div
            layout="position"
            key="nav-links"
            // variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            className="mt-4 basis-full md:hidden"
          >                  
              <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                <NavLink to="/sign_in" activeClassName="selected navlink" className=' active:scale-105 hover:opacity-75'>
                  Login
                </NavLink>
              </motion.div>
              <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                <NavLink to="/sign_up" activeClassName="selected navlink" className=' active:scale-105 hover:opacity-75'>
                  Register
                </NavLink>
              </motion.div>            
          </motion.div>
        )}
      </AnimatePresence>
      :
      <AnimatePresence >
        {isOpen && (
            <motion.div
              layout="position"
              key="nav-links"
              // variants={mobileNavContainerVariant}
              initial="hidden"
              animate="show"
              className="mt-4 basis-full md:hidden"
            >                  
            <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
              <button to="/" onClick={handleLogout} activeClassName="selected navlink" className=' active:scale-105 hover:opacity-75'>
                Logout
              </button>
            </motion.div>            
          </motion.div>
        )}
      </AnimatePresence>
      }
    </div>  
  );
}

export default NavLinks;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useContext, } from "react";
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

        <button onClick={handleLogout} class="Btn">
        
        <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
        
        <div class="text">Logout</div>
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

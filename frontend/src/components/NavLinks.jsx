import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  mobileNavContainerVariant,
  mobileNavListVariant,
  mobileNavExitProps,
} from "../data/animationConfig";

function NavLinks() {
  
  const Links = () => {
    return (
      <>
        <NavLink to="/sign_in" activeClassName="selected navlink" className='mr-6'>
          Login
        </NavLink>
  
        <NavLink to="/sign_up" activeClassName="selected navlink">
          Register
        </NavLink>
      </>
    );
  };

  const Logout = () => {
    return (
        <NavLink to="/" activeClassName="selected navlink" className='mr-6'>
          Logout
        </NavLink>
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='text-white mr-12'>
      <nav className="flex flex-[1] items-center justify-end overflow-hidden text-white font-medium">
        <div className="hidden justify-end md:flex">
          <Links />
        </div>
        <div className="flex w-[75px] justify-end md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
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
              <NavLink to="/sign_in" activeClassName="selected navlink">
                Login
              </NavLink>
            </motion.div>
            <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
              <NavLink to="/sign_up" activeClassName="selected navlink">
                Register
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>  
  );
}

export default NavLinks;

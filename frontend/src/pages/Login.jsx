import React from 'react'
import LandingPageImage  from "../assets/images/LandingPage.png"
import { NavLink,Navigate } from 'react-router-dom'
import {useContext,useState} from 'react'
import {UserContext} from "../contexts/userContext";
import axios from "axios";
import UserSessionRepository from '../data/userSession';
import ToastContext from '../contexts/ToastContext';
import Logo from '../assets/images/Logo.png'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {userID,setUserID} = useContext(UserContext);

  const toastManager = useContext(ToastContext);
  const alertSuccessHandler = () => { toastManager.alertSuccess("Login successful"); }
  const alertErroreHandler = () => { toastManager.alertError("Login failed"); }
  // const alertInfoHandler = () => { toastManager.alertInfo("Info Message"); }

  async function handleLoginSubmit(ev) {
      ev.preventDefault();
      try {
        const data = await axios.post('/login', {email,password});
        setUserID(data.userID);
        console.log(userID)
        console.log(data)
        alertSuccessHandler()
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      } catch (e) {
        alertErroreHandler()
      }
    }
  
    if (redirect) {
      return window.location.href = '/home';
    }
  return (
    <div className='h-screen relative w-screen flex flex-col  px-10' style={{backgroundImage:`url(${LandingPageImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
        <div className={`w-screen h-16 flex justify-between items-center fixed top-0 left-0 z-20 px-10  `}>
            <NavLink to='/'>
              <img src={Logo} alt="" />       
            </NavLink>
        </div>
        <div className='bg-[#D9D9D9] text-[#8F8F8F] absolute top-14 left-52 flex flex-col justify-center h-[28rem] w-[26rem] rounded-2xl bg-opacity-80 shadow-2xl'>
            <div className='flex flex-col justify-center items-center text'>
                <span className='font-bold text-2xl boxshadow mb-3 '> Welcome back</span>
                <span className='font-semibold text-lg'>Please enter your details below to sign in</span>
            </div>
            <form onSubmit={handleLoginSubmit} className='flex flex-col items-center justify-between w-full h-[55%] mt-10'>
                <hr className='bg-black h-0.5 bg-opacity-20  w-[80%]'/> 
                {/* <div className='w-[80%] relative'>   
                  <input 
                    type="text" 
                    className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                    placeholder='Email address'
                  />  
                  <span className='text-red-700 absolute right-[55%] top-2'>*</span>
                </div>   */}

                <div className="inputbox">
                    <input
                      required="required" 
                      type="text"
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
                    />
                    <span>Email *</span>
                    <i></i>
                </div>

                <div className="inputbox">
                    <input
                      required="required" 
                      type="password"
                      value={password}
                      onChange={ev => setPassword(ev.target.value)}
                    />
                    <span>Password *</span>
                    <i></i>
                </div>
                {/* <div className='w-[80%] relative'>
                  <input 
                    type="password" 
                    className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                    placeholder='Password'
                    
                  />
                  <span className='text-red-700 absolute right-[65%] top-2'>*</span>
                </div>   */}
                <button type='submit' className='px-24 py-2 text-white bg-[#4FD4B4] rounded-2xl hover:opacity-80 active:scale-105'>Log in</button> 
                <div className='flex items-center justify-center w-full'>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[25%]'/>
                    <span className='px-2'>Not a member?</span>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[25%]'/>
                </div>
                <NavLink to='/sign_up' className="underline hover:opacity-60 transition-all duration-500 active:scale-105">Create an account</NavLink>
            </form>
        </div>
    </div>

  )
}

export default Login
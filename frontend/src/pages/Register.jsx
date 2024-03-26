import {useState, useContext} from "react";
import RegisterImage  from "../assets/images/Register.png"
import { NavLink, Navigate } from 'react-router-dom'
import axios from "axios";
import ToastContext from '../contexts/ToastContext';
import {UserContext} from "../contexts/userContext";
import Logo from '../assets/images/Logo.png'

function Register() {
    const [fullname,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const toastManager = useContext(ToastContext);
    const [redirect, setRedirect] = useState(false);
    const alertSuccessHandler = () => { toastManager.alertSuccess("Registration successful"); }
    const alertErroreHandler = () => { toastManager.alertError("Registration failed"); }

    async function registerUser(ev) {
        ev.preventDefault();
        try {   
            await axios.post('/register', {
            fullname,
            email,
            password,
            phone
            });
            alertSuccessHandler();
            setRedirect(true)
            // setTimeout(() => {
            // }, 3000);
        } catch (e) {
            alertErroreHandler('Registration failed. Please try again later');
        }

        if (redirect) {
            return <Navigate to={'/sign_in'} />
        }
    }
  return (
    <div className='h-screen relative w-screen flex flex-col  px-10' style={{backgroundImage:`url(${RegisterImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
        <div className={`w-screen h-16 flex justify-between items-center fixed top-0 left-0 z-20 px-10  `}>
            <NavLink to='/'>
            <img src={Logo} alt="" />       
            </NavLink>
        </div>
        <form onSubmit={registerUser} className='bg-[#D9D9D9] text-[#8F8F8F] absolute top-10 right-20 flex flex-col justify-center h-[30rem] w-[45rem] rounded-2xl py-5  bg-opacity-80 shadow-2xl'>
            <div className='flex flex-col justify-center items-center text'>
                <span className='font-bold text-2xl boxshadow mb-3 '> Welcome to Register</span>
                <span className='font-semibold text-md'>Please enter your details below to register</span>
            </div>
            <div className='flex flex-col items-center justify-between w-full h-[65%] mt-5'>
                <hr className='bg-black h-0.5 bg-opacity-20  w-[80%]'/> 
                <div className="flex flex-row ">
                    <div className="inputbox mt-5 mr-5">
                        <input
                            required="required" 
                            type="text"
                            value={fullname}
                            onChange={ev => setFullName(ev.target.value)}
                        />
                        <span>Fullname *</span>
                        <i></i>
                    </div>
                    <div className="inputbox mt-5">
                        <input
                            required="required" 
                            type="text"

                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        <span>Email *</span>
                        <i></i>
                    </div>
                </div>
                <div className="flex flex-row ">
                    <div className="inputbox mt-5  mr-5">
                        <input
                            required="required" 
                            type="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        <span>Password *</span>
                        <i></i>
                    </div>
                    <div className="inputbox mt-5">
                        <input
                            required="required" 
                            type="text"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}  
                        />
                        <span>Phone *</span>
                        <i></i>
                    </div>
                </div>

            </div>
            <NavLink to='/sign_in'n className='px-2 mt-2 ml-16 hover:opacity-60'>already have an account?</NavLink>
            <div className='flex justify-center w-[100%] items-center my-5 '>
                <button type="submit" className='px-16 mt-10 py-2 text-white bg-[#6C675E] rounded-2xl hover:opacity-90 active:scale-105'>Register</button> 
            </div>
            <div className="flex flex-col justify-between items-center">
                {/* <div className='flex items-center justify-center w-full'>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[15%]'/>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[15%]'/>
                </div> */}
                {/* <NavLink to='/sign_in' className="underline ">Login</NavLink> */}
            </div>
        </form>
        </div>  
        )
}

export default Register
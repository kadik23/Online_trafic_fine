import {useState, useContext} from "react";
import RegisterImage  from "../assets/images/Register.png"
import { NavLink, Navigate } from 'react-router-dom'
import axios from "axios";
import ToastContext from '../contexts/ToastContext';


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
        <form onSubmit={registerUser} className='bg-[#D9D9D9] text-[#8F8F8F] absolute top-14 right-52 flex flex-col justify-center h-[30rem] w-[26rem] rounded-2xl py-5  bg-opacity-80 shadow-2xl'>
            <div className='flex flex-col justify-center items-center text'>
                <span className='font-bold text-2xl boxshadow mb-3 '> Welcome to Register</span>
                <span className='font-semibold text-lg'>Please enter your details below to register</span>
            </div>
            <div className='flex flex-col items-center justify-between w-full h-[55%] mt-10'>
                <hr className='bg-black h-0.5 bg-opacity-20  w-[80%]'/> 
                <div className='w-[80%] relative'>  
                    <input 
                        type="text" 
                        className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                        placeholder='Fullname'
                        value={fullname}
                        onChange={ev => setFullName(ev.target.value)}
                    />  
                    <span className='text-red-700 absolute right-[65%] top-2'>*</span>    
                </div>  
                <div className='w-[80%] relative'>   
                    <input 
                        type="text" 
                        className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                        placeholder='Email address'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />  
                    <span className='text-red-700 absolute right-[55%] top-2'>*</span>  
                </div>  
                <div className='w-[80%] relative'>   
                    <input 
                        type="password" 
                        className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                        placeholder='Password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />  
                    <span className='text-red-700 absolute right-[65%] top-2'>*</span>  
                </div>  
                <div className='w-[80%] relative'>   
                    <input 
                        type="number" 
                        className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
                        placeholder='Phone'
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)}/>  
                    <span className='text-red-700 absolute right-[70%] top-2'>*</span>  
                </div>  
            </div>
            <div className='flex justify-center w-[100%] items-center my-5 '>
                <button type="submit" className='px-32 py-2 text-white bg-[#6C675E] rounded-2xl'>Register</button> 
            </div>
            <div className="flex flex-col justify-between items-center">
                <div className='flex items-center justify-center w-full'>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[15%]'/>
                    <span className='px-2'>already have an account?</span>
                    <hr className='bg-black h-0.5 bg-opacity-60  w-[15%]'/>
                </div>
                <NavLink to='/sign_in' className="underline ">Login</NavLink>
            </div>
        </form>
        </div>  
        )
}

export default Register
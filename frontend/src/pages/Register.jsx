import {useState} from "react";
import RegisterImage  from "../assets/images/Register.png"
import { NavLink } from 'react-router-dom'
import axios from "axios";

function Register() {
    const [fullname,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
            fullname,
            email,
            password,
            phone
            });
            alert('Registration successful. Now you can log in');
        } catch (e) {
            alert('Registration failed. Please try again later');
        }
    }
  return (
    <div className='h-screen relative w-screen flex flex-col  px-10' style={{backgroundImage:`url(${RegisterImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
        <form onSubmit={registerUser} className='bg-[#D9D9D9] text-[#8F8F8F] absolute top-14 right-52 flex flex-col justify-center h-[28rem] w-[26rem] rounded-2xl bg-opacity-80 shadow-2xl'>
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
            <div className='flex justify-end w-[90%] items-center my-10 '>
                <NavLink to='/sign_in' className="underline mr-2">Return</NavLink>
                <button type="submit" className='px-8 py-2 text-white bg-[#6C675E] rounded-2xl'>Register</button> 
            </div>
        </form>
</div>  )
}

export default Register
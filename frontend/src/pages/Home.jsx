import React from 'react'
import {useContext,useState} from 'react'
import {UserContext} from "../contexts/userContext";
import Navbar from '../components/Navbar';

function Home() {
  const {user} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  return (
    <div className='w-screen min-h-screen flex flex-wrap  bg-gradient-to-b  from-[#BEB1A6] from-30% to-[#D4CABB] to-60%'>
    {/* <div>{user.email}</div>
    <div>{user.userID}</div> */}
      <Navbar/>
      <div className='w-[400px] h-[445px] mx-12 mt-20 rounded-3xl p-10 flex flex-col justify-between items-center  bg-[#D9D9D9] cardshadow '>
          <div className='font-bold text-3xl text-[#A1A09F] boxshadow'>Your profile</div>
          <div className='text-[#626262] font-medium'>Kadik Salah Eddine</div>
          <form className='text-[#626262] font-medium'>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Fullname:</label>
              <input 
                      name='fullname'
                      type="text" 
                      className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
              />   
            </div>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Email address:</label>
              <input 
                      name='fullname'
                      type="text" 
                      className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
              />   
            </div>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Phone:</label>
              <input 
                      name='fullname'
                      type="text" 
                      className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
              />   
            </div>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Driving Licence Number:</label>
              <input 
                      name='fullname'
                      type="text" 
                      className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
              />   
            </div>
          </form>
      </div>
    </div>
  )
}

export default Home
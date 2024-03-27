import React from 'react'
import {useContext,useState,useEffect} from 'react'
import {UserContext} from "../contexts/userContext";
import Navbar from '../components/Navbar';
import FineCard from '../components/FineCard';
import axios from 'axios';
import ToastContext from '../contexts/ToastContext';
import {Navigate} from "react-router-dom";
import Loading from '../components/Loading';


function Home() {

  const { user, fines, userID, ready} = useContext(UserContext);
  const toastManager = useContext(ToastContext);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [numL, setNumL] = useState('');
  const [redirect, setRedirect] = useState(false);
  const alertSuccessHandler = () => { toastManager.alertSuccess("Login successful"); }
  const alertErroreHandler = () => { toastManager.alertError("Login failed"); }
  
  useEffect(() => {
    console.log(user);
    if(user){
      const data = user[0]
      console.log(data)
      setEmail(data[1])
      setPhone(data[3])
      setFullname(data[2])
      setNumL(data[4])
      console.log(fines)
    }
  },[userID,user,fines]);

  const updateProfile =async (ev)=>{
    ev.preventDefault();
    try {
      const data = await  axios.put(`/profile/${user[0][0]}`,{email,fullname,phone})
      
      alertSuccessHandler('Profile updated')
    }catch(e){
      alertErroreHandler("Failed to update profile")
      console.error(e); 
    }
  }


  if (!ready) {
    return <Loading/>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/sign_in'} />
  }
  return (
    <div className='w-screen min-h-screen    flex flex-wrap gap-20  bg-gradient-to-b  from-[#BEB1A6] from-30% to-[#D4CABB] to-60%'>
      <Navbar/>
      <div className='w-[400px] h-[445px] mt-20 ml-12 rounded-3xl p-10 flex flex-col justify-between items-center  bg-[#D9D9D9] cardshadow '>
          <div className='font-bold text-3xl text-[#A1A09F] boxshadow'>Your profile</div>
          <div className='text-[#626262] font-medium'>Kadik Salah Eddine</div>
          <form onSubmit={updateProfile} className='text-[#626262] font-medium'>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Fullname:</label>
              <input 
                      name='fullname'
                      type="text" 
                      className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none ' 
                      value={fullname}
                      onChange={ev => setFullname(ev.target.value)}
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
                value={phone}
                onChange={ev => setPhone(ev.target.value)}
              />   
            </div>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Driving Licence Number:</label>
              <input 
                name='fullname'
                type="text" 
                className='bg-[#E2E2E2]  w-80  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
                value={numL}
                onChange={ev => setNumL(ev.target.value)}
              />   
            </div>
            <div className='flex w-full justify-end'>
              <button type='submit' className='px-10 py-2 mt-5 text-white bg-[#4FD4B4] rounded-2xl hover:opacity-80 '>Update</button> 
            </div>
          </form>
      </div>
      <div className='w-[660px] p-10 bg-[#D9D9D9] mr-12 my-20 rounded-3xl cardshadow flex flex-col items-center'>
        <h1 className='font-bold text-3xl text-[#A1A09F] boxshadow  mb-3'>Your Previous Violations</h1>
  
          {fines && fines.map((item,index) => (
            <FineCard key={index} data={item}/>
          ))}
      </div>
    </div>
  )
}

export default Home
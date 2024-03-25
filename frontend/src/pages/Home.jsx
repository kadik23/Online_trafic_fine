import React from 'react'
import {useContext,useState,useEffect} from 'react'
import {UserContext} from "../contexts/userContext";
import Navbar from '../components/Navbar';
import FineCard from '../components/FineCard';
import axios from 'axios';
import ToastContext from '../contexts/ToastContext';

function Home() {

  const { user, setUser, fines, setFines, payments, setPayments, userID, setUserID } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [numL, setNumL] = useState('');
  const [redirect, setRedirect] = useState(false);

  const toastManager = useContext(ToastContext);
  const alertSuccessHandler = () => { toastManager.alertSuccess("Login successful"); }
  const alertErroreHandler = () => { toastManager.alertError("Login failed"); }

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

  useEffect(() => {
    console.log(user);
      const data = user[0]
      console.log(data)
      setEmail(data[1])
      setPhone(data[3])
      setFullname(data[2])
      if(fines){
        console.log(fines)
      }
  },[userID,user,fines]);
  return (
    <div className='w-screen min-h-screen    flex flex-wrap gap-20  bg-gradient-to-b  from-[#BEB1A6] from-30% to-[#D4CABB] to-60%'>
    {/* <div>{user.email}</div>
    <div>{user.userID}</div> */}
      <Navbar/>
      <div className='w-[400px] h-[445px] mt-20 ml-12 rounded-3xl p-10 flex flex-col justify-between items-center  bg-[#D9D9D9] cardshadow '>
          <div className='font-bold text-3xl text-[#A1A09F] boxshadow'>Your profile</div>
          <div className='text-[#626262] font-medium'>Kadik Salah Eddine</div>
          <form onSubmit={updateProfile} className='text-[#626262] font-medium'>
            <div className='flex flex-col'>
              <label htmlFor="fullname">Fullname:</label>
              {/* {user} */}
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
              <button type='submit' className='px-10 py-2 mt-5 text-white bg-[#4FD4B4] rounded-2xl'>Update</button> 
            </div>
          </form>
      </div>
      <div className='w-[660px] p-10 bg-[#D9D9D9] mr-12 my-20 rounded-3xl cardshadow flex flex-col items-center'>
        <h1 className='font-bold text-3xl text-[#A1A09F] boxshadow  mb-3'>Your Previous Violations</h1>
  
          {fines.map((item,index) => (
            <FineCard key={index} data={item}/>
          ))}
        {/* {fines[0][0]} */}


        {/* <FineCard/>
        <FineCard/> */}
      </div>
    </div>
  )
}

export default Home
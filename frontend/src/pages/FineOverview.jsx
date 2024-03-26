import React from 'react'
import FineOverviewImage  from "../assets/images/FineOverview.png"
import {useContext,useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import {UserContext} from "../contexts/userContext";
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import axios from 'axios';
import ToastContext from '../contexts/ToastContext';

function FineOverview() {
  const { id } = useParams();
  const { user, setUser, fines, setFines, payments, setPayments, userID, setUserID, oneFine,setOneFine } = useContext(UserContext);
  const [filteredArray, setFilteredArray] = useState();
  const [EDLS, setEDLS] = useState();
  let [isPay,setIsPay] = useState('Unpaid')
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (fines) { 
        // console.log(fines)
        const idToFilter = id
        const filteredData = fines.filter(([id]) => id === idToFilter);
        setFilteredArray(filteredData);
        // console.log( filteredArray);
        // console.log(" data : " + filteredArray[0][6]);
        if(filteredArray){
          const status = filteredArray[0][6]
          console.log(status);
          if (status == 'TRUE') {
            setIsPay('Paid')
          }
        }
        console.log(user)
    }
  }, [userID,user,fines])

  const toastManager = useContext(ToastContext);
  const alertErroreHandler = () => { toastManager.alertError("Update failed"); }
  
  const handlePaymentForm = async (ev) => {
    ev.preventDefault();
    try {
      const data = await  axios.put(`/profile/${user[0][0]}`,{email:user[0][1],fullname:user[0][2],phone:user[0][4],EDLS:EDLS})
      console.log('Profile updated')
      setRedirect(true);
    }catch(e){
      alertErroreHandler("Failed to update profile")
      console.error(e); 
    }
  }

  if (redirect) {
    return <Navigate to={`/payment_gateway/${id}`} />
  }

  return (
    <div className='h-screen w-screen px-10 gap-[15rem] flex items-start pt-5 justify-around' style={{backgroundImage:`url(${FineOverviewImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
      <Navbar/>
      <div className='w-[450px] h-[450px] flex flex-col justify-between mt-16 p-10 items-center font-semibold bg-[#D9D9D9] bg-opacity-75 rounded-2xl cardshadow'>
        <div className='font-bold text-3xl text-[#A1A09F] boxshadow'>Your Previous Violations</div>
        <hr className='bg-black h-0.5 bg-opacity-20  w-[80%]'/> 
        <div className='w-full p-2 flex justify-between'>
          <span>Fine_ID:</span>
          <span>{filteredArray && filteredArray[0][0]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Issue_date:</span>
          <span>{filteredArray && filteredArray[0][3]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Type:</span>
          <span>{filteredArray && filteredArray[0][1]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Location:</span>
          <span>ouzra</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Pay date:</span>
          {isPay === 'Paid' ? <span>{filteredArray&& filteredArray[0][5]}</span> : <span>______</span>}
      </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Amount:</span>
          <span>{filteredArray&& filteredArray[0][2]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
          <span>Status:</span>
          <span className={isPay === 'Paid' ? 'text-[#43D100]' : 'text-[#FA0000]'}>{isPay}</span>
        </div>
        {
          isPay === 'Paid' &&  (<a href='/' className='underline text-green-600 text-lg'>Download Receipt</a>)
        }


      </div>
      {
        isPay == 'Unpaid' ?
        <form onSubmit={handlePaymentForm} className='w-[450px] h-[170px] flex flex-col justify-between mt-16 p-5 items-center font-semibold bg-[#D9D9D9] bg-opacity-75 rounded-2xl cardshadow'>
          <div className='font-semibold text-xl  boxshadow'>Driving Licence Number:</div>
          <input 
              name='fullname'
              type="text" 
              className='bg-[#E2E2E2]  w-3/4  px-5 py-1 text-start placeholder:font-semibold rounded-lg outline-none' 
              value={EDLS}
              onChange={ev => setEDLS(ev.target.value)}
              placeholder='Enter Driving Licence Number..'
              required
          /> 
          <button type='submit' className='px-32 py-2  text-white bg-[#4FD4B4] rounded-2xl'>Go to payment</button> 
        </form>
        : ''
      }
  
    </div>
  )
}

export default FineOverview
import React, { useState, useContext, useEffect } from 'react'
import PaymentImage  from "../assets/images/Payment.png"
import Eldahabiya  from "../assets/images/eldahabiya.png"
import Cib  from "../assets/images/Cib.png"
import Navbar from '../components/Navbar'
import { CreditCard } from 'lucide-react';
// import Popup from '../components/Popup'
import PopupContext from '../contexts/PopupContext'
// import usePopup from '../hooks/usePopup'
import axios from 'axios';
import {UserContext} from "../contexts/userContext";
import { useParams } from 'react-router-dom';

function PaymentGiteway() {
  const { user, setUser, fines, setFines, payments, setPayments, userID, setUserID, oneFine,setOneFine } = useContext(UserContext);
  const [cardNumber,setCardNumber] = useState()
  const [cardHolder,setCardHolder] = useState()
  const [cartdName,setCardName] = useState()
  const [CVV,setCCV] = useState()
  const [expiryDate,setExpiryDate] = useState()
  const [getOneFine,setGetOneFine] = useState()
  const popupManager = useContext(PopupContext);
  const alertSuccessHandler = () => { popupManager.alertSuccess("Success Message"); }
  const alertErroreHandler = () => { popupManager.alertError("Error Message"); }
  const { id } = useParams();  

  const handlePaymentFormSubmit = async(ev) => {
    ev.preventDefault();
    try {
      const {data} = await  axios.post(`/payTraficFine/${id}`,{paymentMethod:cartdName})
      if (getOneFine) {
        setOneFine({fineID: id, amount: getOneFine[2], issueDate: getOneFine[3], payDate:getOneFine[5], transactionID: data})
        alertSuccessHandler("Success Message")
        console.log(oneFine)
      }
      // setRedirect(true);
    }catch(e){
      alertErroreHandler("Failed to update profile")
      console.error(e); 
    }
  }

  const getOneFineRequest = async () => {
    try {
      const { data } = await axios.get(`getOneFine/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneFineRequest();
        setGetOneFine(data);
        console.log("one fine:", data);
  
        // Update oneFine state once getOneFine is available
        setOneFine({
          fineID: id,
          amount: data?.amount, // Access the properties of data directly
          issueDate: data?.issueDate,
          payDate: data?.payDate,
          transactionID: null // Set to null as it's not available yet
        });
      } catch (error) {
        console.error("Error setting state:", error);
      }
    };
  
    fetchData();
  }, [id]); // Add id to dependency array to fetch data whenever id changes
  
  
  

  return (
    <div className='h-screen w-screen px-10 flex items-center' style={{backgroundImage:`url(${PaymentImage })`,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
    <Navbar/>
    <button className='m-2 cursor-pointer' onClick={alertErroreHandler}>Err</button>
    <button className='m-2 cursor-pointer' onClick={alertSuccessHandler}>Succ</button>
    <form onSubmit={handlePaymentFormSubmit} className='w-[650px] h-[450px] flex flex-col justify-between mt-16 p-10 items-center font-semibold bg-[#D9D9D9] bg-opacity-75 rounded-2xl cardshadow'>
        <div className='font-bold p-2 text-3xl text-[#A1A09F] boxshadow flex items-center '>
          <CreditCard />
          <span className='ml-4'>Payment</span>
        </div>
        <p className='text-[#A1A09F] p-2 font-medium'>Please enter your details below to pay</p>
        <hr className='bg-black h-0.5 bg-opacity-20 m-2 w-[80%]'/> 
        <div className='flex justify-start w-full p-2'>
          <div className='flex justify-around w-1/3 p-2 items-center bg-[#E2E2E2] rounded-lg '>
            <div className='flex items-center'>
              <label htmlFor="ecib">
                <img src={Cib} alt="" className='w-6 mr-2 h-6'/>
              </label>
              <input type="radio" name="card" value={cartdName} onChange={ev => setCardName(ev.target.value)} required/>
            </div>
            <div className='flex items-center'>
              <label htmlFor="dahabiya">
                <img src={Eldahabiya} alt="" className='w-6 mr-2 '/>
              </label>
              <input type="radio" name="card" value={cartdName}  onChange={ev => setCardName(ev.target.value)} required/>
            </div>
          </div>
        </div>

        <div className='w-full p-2 relative'>
          <input 
            type="text" 
            className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
            placeholder='cardholder’s Name'
            value={cardHolder}
            required
            onChange={ev => setCardHolder(ev.target.value)}
          />
          <span className='text-red-700 absolute right-[65%] top-4'>*</span>
        </div>
        <div className='flex'> 
          <div className='w-[40%] p-2 relative'>
            <input 
              type="text" 
              className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
              placeholder='card Number'
              value={cardNumber}
              required
              onChange={ev => setCardNumber(ev.target.value)}
            />
            <span className='text-red-700 absolute right-[30%] top-4'>*</span>
          </div> 
          <div className='w-[33%] p-2 relative'>
            <input 
              type="date" 
              className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
              placeholder='Expiry Date'
              value={CVV}
              required
              onChange={ev => setCCV(ev.target.value)}
            />
            <span className='text-red-700 absolute right-[23%] top-4'>*</span>
          </div> 
          <div className='w-[30%] p-2 relative'>
            <input 
              type="text" 
              className='bg-[#E2E2E2]  w-full px-10 py-2 text-start placeholder:font-semibold rounded-lg outline-none' 
              placeholder='cvv'
              value={expiryDate}
              required
              onChange={ev => setExpiryDate(ev.target.value)}
            />
            <span className='text-red-700 absolute right-[50%] top-4'>*</span>
          </div> 
        </div> 
        <div className='w-full p-2 flex justify-center '>
          <div className='w-1/2 p-2'>
            <button type='submit' className='px-24 py-2 text-white bg-[#4FD4B4] rounded-2xl hover:opacity-80'>Pay Now</button> 
          </div>
        </div>
      </form> 
    </div>
  )
}

export default PaymentGiteway
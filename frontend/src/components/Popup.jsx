import React, {useContext,useState,useEffect} from 'react'
import PopupImage from '../assets/images/Popup.png'
import SuccessIcon from '../assets/images/SuccessIcon.png'
import FailedIcon from '../assets/images/FailedIcon.png'
import PopupContext from '../contexts/PopupContext';
import {UserContext} from "../contexts/userContext";

function Popup() {
    const popupManager = useContext(PopupContext);

    

    return (
        <div >
            {
                popupManager.messages && popupManager.messages.map((message, index) => {
                    return (
                        <PopupM key={index} message={message} />
                    )
                })
            }
        </div>
    )
}

function PopupM({message}){
    if(message.type == 'success')
    return (
    <div className='w-[800px] h-[470px] fixed top-10 left-44  z-50 flex flex-col items-center justify-around' style={{background:`url(${PopupImage })` ,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>

        <Success/>
    </div>)
    if(message.type == 'error') 
    return (
    <div className='w-[800px] h-[470px] fixed top-10 left-44   z-50 flex flex-col items-center justify-around' style={{background:`url(${PopupImage })` ,backgroundSize: '100% 100%',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>

        <Failed/>
    </div>)
}

function Success(){
    const { oneFine } = useContext(UserContext);
    useEffect(() => {
        console.log("fine is" +oneFine)
    }, [])
    return(
        <div className='mt-8'>
            <div>
            <img src={SuccessIcon} alt="" />
            <h1 className='font-bold px-2 text-xl text-[#828282] text-center flex flex-col items-center'>Payment Received!</h1>
            <p className='text-[#828282] font-medium'>You have paid your fine successful </p>
            <hr className='bg-[#828282] h-0.5 bg-opacity-60  w-[100%]'/>
            <div className='flex w-full justify-between'>
                <span>Fine ID:</span>
                {oneFine && <span>{oneFine.fineID}</span>}
            </div>
            <div className='flex w-full justify-between'>
                <span>Total Amount :</span>
                { oneFine && <span>{oneFine.amount} DA</span>}
            </div>
            <div className='flex w-full justify-between'>
                <span>Issue_date :</span>
                { oneFine && <span>{oneFine.issueDate}</span>}
            </div>
            <div className='flex w-full justify-between'>
                <span>Pay date :</span>
                { oneFine && <span>{oneFine.payDate}</span>}
            </div>
            <div className='flex w-full justify-between'>
                <span>Transaction ID :</span>
                { oneFine && <span>{oneFine.transactionID}</span>}
            </div>
            </div>
            <h1 className='text-[#434343] font-semibold absolute top-2 ml-14'>Confirm payment</h1>
            
            <a href='/home' type='submit' className='px-10 py-1.5 ml-20 my-2 text-white bg-[#4FD4B4] rounded-2xl hover:opacity-80'>OK</a> 
        </div> 
    )
}

function Failed(){
    return(
        <div className=''>
            <h1 className='text-[#434343] font-semibold absolute top-2'>Confirm payment</h1>
            <img src={FailedIcon} alt="" />
            <h1 className='font-bold p-2 text-xl text-[#828282]'>Payment failed!</h1>
            <p className='text-[#828282] font-medium'>Pleasw try again </p>
            <a href='fine_overview' type='submit' className='px-16 py-2 bg-white text-[#D53030] border border-[#D53030] rounded-2xl hover:opacity-80'>OK</a> 
        </div>
    )
}

export default Popup
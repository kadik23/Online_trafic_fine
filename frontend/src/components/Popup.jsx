import React, {useContext} from 'react'
import PopupImage from '../assets/images/Popup.png'
import SuccessIcon from '../assets/images/SuccessIcon.png'
import FailedIcon from '../assets/images/FailedIcon.png'
import PopupContext from '../contexts/PopupContext';

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
    return(
        <div className='mt-10'>
            <h1 className='text-[#434343] font-semibold absolute top-2'>Confirm payment</h1>
            <img src={SuccessIcon} alt="" />
            <h1 className='font-bold p-2 text-xl text-[#828282]'>Payment Received!</h1>
            <p className='text-[#828282] font-medium'>You have paid your fine successful </p>
            <hr className='bg-[#828282] h-0.5 bg-opacity-60  w-[100%]'/>
            <div>
                <span>Fine ID:</span>
                <span>F27851</span>
            </div>
            <div>
                <span>Total Amount :</span>
                <span>3000.00 DA</span>
            </div>
            <div>
                <span>Issue_date :</span>
                <span>22/03/2024</span>
            </div>
            <div>
                <span>Pay date :</span>
                <span>23/03/2024</span>
            </div>
            <div>
                <span>Transaction ID :</span>
                <span>TR214378</span>
            </div>
            <button type='submit' className='px-16 py-2 text-white bg-[#4FD4B4] rounded-2xl'>OK</button> 
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
            <button type='submit' className='px-16 py-2 bg-white text-[#D53030] border border-[#D53030] rounded-2xl'>OK</button> 
        </div>
    )
}

export default Popup
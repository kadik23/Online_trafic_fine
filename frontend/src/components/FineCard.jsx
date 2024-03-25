import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function FineCard({data}) {
    let isPay = 'Unpaid'
    const status = data[6]
    if (status == 'TRUE') {
        isPay = 'Paid'
    }
  return (
    <NavLink to={`/fine_overview/${data[0]}`} className='bg-[#EEECEC] w-[576px] h-[190px] flex flex-col justify-around p-5 text-[#636262] shadow-lg rounded-xl mb-3 hover:scale-105 transition-all duration-500 cursor-pointer'>
        <div className='w-full p-1 flex justify-between'>
            <span>Issue_date:</span>
            <span>{data[3]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
            <span>Type:</span>
            <span>{data[1]}</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
            <span>Amount:</span>
            <span>{data[2]} DA</span>
        </div>
        <div className='w-full p-2 flex justify-between'>
            <span>Status:</span>
            <span className={isPay === 'Paid' ? 'text-[#43D100]' : 'text-[#FA0000]'}>{isPay}</span>
        </div>
    </NavLink>
  )
}

export default FineCard
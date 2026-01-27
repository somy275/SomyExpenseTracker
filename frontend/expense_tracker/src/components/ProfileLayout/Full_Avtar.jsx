import React from 'react'
import { IoClose } from "react-icons/io5";
const Full_Avtar = ({ ShownFullAvtar, setShownFullAvtar, UserAvtarr }) => {
    return (
        ShownFullAvtar && (
            <div id='Fullavtar' onClick={(e) => e.target.id === "Fullavtar" ? setShownFullAvtar(false) : ""} className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 h-full w-full'>
                <div
                    className='relative p-5 h-[90%] w-[90%]  bg-[#222222] flex items-center justify-center rounded-2xl'>
                    <img className='object-cover object-center max-w-[90%] h-[80%] lg:h-full' srcSet={UserAvtarr} />
                    <IoClose onClick={()=>setShownFullAvtar(false)} className='w-10 h-10 self-start absolute right-8 bg-gray-400 p-1 rounded-full cursor-pointer'/>
                </div>
            </div>
        )
    )
}

export default Full_Avtar

import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import moment from "moment"
import { useEffect, useState } from "react";
import Full_Avtar from "./Full_Avtar";
const UserInfo = () => {
    const res = useSelector((state) => state?.auth?.user)
    // const res1 = useSelector((state) => state?.Active?.UserActive)
    const isEmailVerified = useSelector((state) => state?.auth?.user?.user?.isEmailVerified)
    const [Online, setOnline] = useState(false)
    const [ShownFullAvtar, setShownFullAvtar] = useState(false)
    window.onoffline = () => {
        setOnline(false)
    }
    window.ononline = () => {
        setOnline(true)
    }
    useEffect(() => {
        if (window.navigator.onLine) {
            setOnline(true)
        }
        else if (!window.navigator.onLine) {
            setOnline(false)
        }
    }, [])

    const [UserAvtarr, setUserAvtarr] = useState("")
    useEffect(() => {
        setUserAvtarr(res ? res?.user?.avatar : "")
    }, [res])


    return (

        <div className='relative w-full min-w-[70vw]  min-[450px]:max-w-4xl lg:max-w-7xl  flex flex-col lg:flex-row items-center md:items-baseline justify-between bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-4 px-2  md:p-8 shadow-xl '>
            <div className='flex flex-col md:flex-row lg:items-start items-center gap-3 md:gap-6'>
                <div className='relative w-fit'>
                    <span className='h-[max(5rem,21vw)] w-[max(5rem,21vw)] min-[450px]:h-[max(5.9rem,15vw)] min-[450px]:w-[max(5.9rem,15vw)] max-w-[110px] max-h-[110px] lg:h-[clamp(4.875rem,3.4324rem+2.2541vw,6.25rem)] lg:w-[clamp(4.875rem,3.4324rem+2.2541vw,6.25rem)] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden '>
                        {
                            UserAvtarr ? <img onClick={() => setShownFullAvtar(true)} src={UserAvtarr} className="cursor-pointer object-cover w-full h-full" /> : <FiUser className='w-10 h-10 text-white' />
                        }

                    </span>
                    {
                        Online ? <div className="absolute bottom-0.5 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div> : <div className="absolute bottom-0.5 right-0 w-5 h-5 bg-red-500 rounded-full border-2 border-white"></div>
                    }

                </div>
                <span className='flex-1 flex flex-col min-[850px]:flex-none items-center md:items-baseline   text-white '>
                    <h3 className='text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] text-center  font-bold mb-0.5'>{res?.user?.FullName}</h3>
                    <span className='flex items-center gap-3 flex-wrap'>
                        <p className='text-blue-100 flex items-center space-x-2 text-[max(.8rem,3.7vw)] min-[450px]:text-[max(1.05rem,2.6vw)] md:text-[max(1.26rem,1.8vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)]'>
                            <MdOutlineMailOutline className='h-[max(.8rem,4.5vw)] w-[max(.8rem,4.5vw)] min-[450px]:h-[max(1.2rem,3.2vw)] min-[450px]:w-[max(1.2rem,3.2vw)] md:h-[max(1.5rem,2.7vw)] md:w-[max(1.5rem,2.7vw)]  lg:h-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] lg:w-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)]' />
                            <span>
                                {res?.user?.Email}
                            </span>
                        </p>
                        {
                            isEmailVerified ? <FiCheckCircle className="w-[max(.8rem,4.5vw)] h-[max(.8rem,4.5vw)] min-[450px]:h-[max(1.2rem,3.2vw)] min-[450px]:w-[max(1.2rem,3.2vw)] md:h-[max(1.5rem,2.7vw)] md:w-[max(1.5rem,2.7vw)] lg:h-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] lg:w-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] text-green-400" title="Verified" />
                                : <IoAlertCircleOutline className="w-[max(.8rem,4.5vw)] h-[max(.8rem,4.5vw)] min-[450px]:h-[max(1.2rem,3.2vw)] min-[450px]:w-[max(1.2rem,3.2vw)] md:h-[max(1.5rem,2.7vw)] md:w-[max(1.5rem,2.7vw)] lg:h-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] lg:w-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] text-red-400" title="Not verified" />
                        }

                    </span>
                    <p className='text-blue-100 flex items-center space-x-2 mt-[.1rem] text-[max(.8rem,3.7vw)] min-[450px]:text-[max(1.05rem,2.6vw)] md:text-[max(1.26rem,1.8vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)]'>
                        <IoMdCalendar className='h-[max(.8rem,4.5vw)] w-[max(.8rem,4.5vw)] min-[450px]:h-[max(1.2rem,3.2vw)] min-[450px]:w-[max(1.2rem,3.2vw)] md:h-[max(1.5rem,2.7vw)] md:w-[max(1.5rem,2.7vw)] lg:h-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] lg:w-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)]' />
                        <span>
                            Member Since <span className='text-white font-semibold'>{moment(res?.user?.createdAt).format("MMM YYYY")}</span>
                        </span>
                    </p>
                </span>
            </div>

            {/* <span className='text-purple-100  flex items-center  space-x-2 mt-[.1rem] md:mt-[1rem] lg:mt-[.1rem] text-[max(.8rem,3.7vw)] min-[450px]:text-[max(1.05rem,2.6vw)] md:text-[max(1.26rem,1.8vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)]'>
                <FaRegClock className='h-[max(.8rem,4.5vw)] min-[450px]:h-[max(1.2rem,3.2vw)] min-[450px]:w-[max(1.2rem,3.2vw)] md:h-[max(1.5rem,2.7vw)] md:w-[max(1.5rem,2.7vw)]  w-[max(.8rem,4.5vw)] lg:h-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] lg:w-[clamp(1.0125rem,0.3535rem+0.7172vw,1.25rem)] ' />
                <p >Last active: {moment(res1?.lastActive).fromNow()}</p>
            </span> */}
            <Full_Avtar ShownFullAvtar={ShownFullAvtar} setShownFullAvtar={setShownFullAvtar} UserAvtarr={UserAvtarr} />
        </div>

    )
}

export default UserInfo

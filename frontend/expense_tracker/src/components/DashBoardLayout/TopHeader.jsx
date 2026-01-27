
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
const TopHeader = ({ activeTab }) => {
    const res = useSelector((state) => state?.auth?.user)
    const [UserAvtarr, setUserAvtarr] = useState("")
    useEffect(() => {
        setUserAvtarr(res ? res?.user?.avatar : "")
    }, [res])

    return (
        <div className='overflow-hidden  '>
            <header className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 px-14 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 capitalize">{activeTab}</h1>
                        <p className="text-sm text-gray-500">Manage your finances efficiently</p>
                    </div>
                </div>

                {
                    UserAvtarr ? <img className="h-12 w-12 object-cover rounded-full shadow-lg" srcSet={UserAvtarr} /> :
                        <div className="inline-flex items-center text-white font-medium h-10 w-10 justify-center  bg-gradient-to-r from-blue-600 to-purple-600 rounded-full  shadow-lg">
                            <AiOutlineUser className="h-5 w-5" />
                        </div>
                }



            </header>
        </div>
    )
}

export default TopHeader
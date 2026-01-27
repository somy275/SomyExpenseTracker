import React from 'react'
import { FiUser } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaShieldAlt } from "react-icons/fa";
import { NavLink } from 'react-router';
const ProfileBar = () => {
    return (
        <div className="space-y-6 w-full min-w-[70vw] min-[450px]:max-w-4xl lg:max-w-7xl ">
            <div className="flex flex-col md:flex-row items-center lg:items-baseline justify-around   bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-3">
                <NavLink className={({ isActive }) => `${isActive || location.pathname === "/profile" ? "bg-[#2563EB] text-white shadow-lg shadow-[#2564eb8f]" : "text-[#4B5563]"} w-full min-[450px]:max-w-[20rem] md:w-fit text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)] py-3 px-6 flex gap-2 items-center justify-center lg:justify-baseline  rounded-xl font-medium`} to="Userprofile" id="profile" label="Profile" icon={FiUser}  >
                    <FiUser className='text-lg' />
                    <span>
                        Profile
                    </span>
                </NavLink>
                <NavLink className={({ isActive }) => `${isActive ? "bg-[#2563EB] text-white shadow-lg shadow-[#2564eb8f]" : "text-[#4B5563]"} w-full min-[450px]:max-w-[20rem] md:w-fit text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)] py-3 px-6 flex gap-2 items-center justify-center lg:justify-baseline rounded-xl font-medium`} to="statistics" id="statistics" label="Statistics" icon={AiOutlineBarChart} >
                    <AiOutlineBarChart className='text-xl' />
                    <span>Statistics</span>
                </NavLink>
                <NavLink className={({ isActive }) => `${isActive ? "bg-[#2563EB] text-white shadow-lg shadow-[#2564eb8f]" : "text-[#4B5563]"} w-full min-[450px]:max-w-[20rem] md:w-fit text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)] py-3 px-6 flex gap-2 items-center justify-center lg:justify-baseline rounded-xl font-medium`} to="profile-setting" id="settings" label="Settings" icon={FaShieldAlt} >
                    <FaShieldAlt className='text-lg' />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileBar
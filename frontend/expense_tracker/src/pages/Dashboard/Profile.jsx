import React from 'react'
import UserInfo from '../../components/ProfileLayout/UserInfo'
import { Outlet } from 'react-router'
import ProfileBar from '../../components/ProfileLayout/ProfileBar'

const Profile = () => {
    return (
        <section className='bg-[#F3F8FF] h-full   w-auto p-8 flex items-center  flex-col gap-10 overflow-auto '>
            <UserInfo />
            <ProfileBar />
            <Outlet />

        </section>
    )
}

export default Profile
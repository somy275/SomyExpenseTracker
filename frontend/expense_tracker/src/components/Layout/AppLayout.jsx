import React, { useState } from 'react'
import { Outlet } from 'react-router'
import SideBar from '../DashBoardLayout/SideBar'
import TopHeader from '../DashBoardLayout/TopHeader'
const AppLayout = () => {
    const [activeTab, setactiveTab] = useState("Dashboard")
    return (
        <>
            <main className='flex'>
                <SideBar setactiveTab={setactiveTab} />
                <section className='flex flex-col h-screen w-screen overflow-y-hidden '>
                    <TopHeader activeTab={activeTab} />
                    <Outlet />
                </section>
            </main>
        </>

    )
}

export default AppLayout
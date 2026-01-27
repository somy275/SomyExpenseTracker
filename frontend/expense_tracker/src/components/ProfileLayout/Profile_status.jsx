import React from 'react'
import AccountStatus from './AccountStatus'
import EditProfile from './EditProfile'

const Profile_status = () => {
  return (
    <div className='flex flex-col items-center w-full md:items-start lg:items-center gap-5'>
      <AccountStatus />
      <EditProfile />
    </div>
  )
}

export default Profile_status
import React from 'react'
import EmailVerify from './EmailVerify'
import ChangePassword from './ChangePassword'

const Profile_Setting = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center lg:place-items-baseline ">
      <EmailVerify />
      <ChangePassword />
    </div>
  )
}

export default Profile_Setting
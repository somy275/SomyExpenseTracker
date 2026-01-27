import React from 'react'
import { LuCircleCheckBig } from "react-icons/lu";
import { FiXCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { SendVerifyEmailLink } from '../../Store/profileSlice';
import { useNavigate } from 'react-router';
const EmailVerify = () => {
    const isEmailVerified = useSelector((state) => state?.auth?.user.user?.isEmailVerified)
    const { loading } = useSelector(state => state?.profile)
    const { Email } = useSelector(state => state?.auth?.user?.user)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleEmailVerification = async () => {
        const res = await dispatch(SendVerifyEmailLink(JSON.stringify({ Email })));
        if(SendVerifyEmailLink.fulfilled.match(res)){
            navigate("/VerifyEmailCode")
        }
    }

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 w-full min-w-[70vw] md:min-w-[50vw] lg:min-w-[30vw] min-[450px]:max-w-4xl md:max-w-7xl lg:w-fit h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Email Verification</h3>
            <div className="space-y-4"></div>
        
            <div className="flex items-center  space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isEmailVerified ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    {isEmailVerified ? (
                        <LuCircleCheckBig className="w-6 h-6  text-green-600" />
                    ) : (
                        <FiXCircle className="w-6 h-6 text-red-600" />
                    )}
                </div>
                <div className='w-[50%]'>
                    <p className="font-medium text-gray-900">somyranjank@gmai.com</p>
                    <p className={`text-sm ${isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {isEmailVerified ? 'Verified' : 'Not verified'}
                    </p>
                </div>
            </div>
            {!isEmailVerified && (
                <button
                    onClick={handleEmailVerification}
                    className="w-full mt-4 px-4 py-3 bg-[#2563EB] shadow-[#2564eb8f] shadow-lg hover:bg-blue-700 text-white rounded-xl hover:bg-blue-[#2563EB] transition-colors"
                >
                    {
                        loading ? "Sending..." : " Send Verification Email"
                    }

                </button>
            )}
        </div>

    )
}

export default EmailVerify
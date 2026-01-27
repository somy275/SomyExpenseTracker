import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router'

const EmailVerified = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Email Verified!
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Your email address has been successfully verified.
                    </p>

                    <div className="space-y-4">
                        <button onClick={() => navigate("/profile/Userprofile")} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors">
                            Continue to Dashboard
                        </button>

                        <button onClick={() => navigate("/")} className="w-full text-gray-500 hover:text-gray-700 transition-colors">
                            Return to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerified
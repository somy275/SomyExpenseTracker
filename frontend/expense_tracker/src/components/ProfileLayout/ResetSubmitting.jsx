import React, { memo } from 'react'
import { useNavigate } from 'react-router'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiCheckCircle } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
const ResetSubmitting = ({ Submitted }) => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="w-8 h-8  text-purple-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>

                    <p className="text-gray-300 mb-2">
                        We've sent a password reset link to:
                    </p>

                    <p className="text-purple-300 font-medium mb-6 break-all">
                        {Submitted.Email}
                    </p>

                    <p className="text-sm text-gray-400 mb-8">
                        Didn't receive the email? Check your spam folder or try again in a few minutes.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <FaArrowLeftLong className="w-4 h-4" />
                        Back to Login
                    </button>
                </div>
            </div>
            <Toaster
                toastOptions={{
                    duration: 2500,
                    error: {
                        style: {
                            backgroundImage: "linear-gradient(to right,#155dfc,#9810fa)",
                            color: "white"
                        },
                    },

                }} />
        </div>
    )
}

export default memo( ResetSubmitting)
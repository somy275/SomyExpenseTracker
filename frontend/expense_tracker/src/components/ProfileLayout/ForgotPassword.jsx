import React, {  useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import ResetSubmitting from './ResetSubmitting';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword } from '../../Store/profileSlice';
import toast, { Toaster } from 'react-hot-toast';
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const [isSubmitting, setisSubmitting] = useState(false)
    const { Submitted, error } = useSelector(state => state?.profile)
    const isLoading = false

    const navigate = useNavigate()
    const onReset = async (data) => {
        const res = await dispatch(ResetPassword(data));

        if (ResetPassword.fulfilled.match(res)) {
            toast.success("Resend link send successfully", {
                id: 'Resend'
            });
            setisSubmitting(true)
        }
        if (error) {
            toast.error(error, {
                id: "Reset Error"
            });

        }

    }


    if (isSubmitting) {
        return (
            <ResetSubmitting Submitted={Submitted} />
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-purple-500/30">
                        <MdOutlineEmail className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-400">
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit(onReset)} className="space-y-4">
                        <div className=''>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    {...register("Email", {
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                                            message: 'Enter a valid email address'
                                        }
                                    })}
                                    id="email"
                                    type="email"
                                    name='Email'
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email address"
                                />
                                <MdOutlineEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        {errors && errors.Email && <p className='block text-sm font-medium text-gray-300 '>{errors.Email.message}</p>}
                        {/* {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )} */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 mt-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending Reset Link...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        <div className="text-center">
                            <button onClick={() => navigate(-1)}
                                type="button"
                                // onClick={handleBackToLogin}
                                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center justify-center gap-2 mx-auto"
                            >
                                <FaArrowLeftLong className="w-4 h-4" />
                                Back to Previous Page
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-xs text-gray-400">
                        Need help? Contact our{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                            support team
                        </a>
                    </p>
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

export default ForgotPassword
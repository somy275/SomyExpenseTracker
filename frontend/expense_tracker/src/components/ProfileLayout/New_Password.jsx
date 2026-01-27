import React, { memo } from 'react'
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { ResetPassChange } from '../../Store/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';

const New_Password = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ResetUserId = useSelector(state => state?.profile?.ResetUserId?.ResetUserId)
    const { loading, error } = useSelector(state => state.profile)
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const Password = watch("New_Pass");

    const onChangePass = async (data) => {
        const userData = {
            ...data, ResetUserId
        }
        console.log(userData);

        const result = await dispatch(ResetPassChange(userData))
        if (ResetPassChange.fulfilled.match(result)) {
            navigate("/profile")
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                        <FaCheckCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
                    <p className="text-gray-600">Enter your new password below</p>
                </div>

                <form onSubmit={handleSubmit(onChangePass)} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("New_Pass", {
                                    required: {
                                        value: true,
                                        message: "New Password is required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Password must contain at least one uppercase letter, lowercase letter, number and special character"
                                    }
                                })
                                }
                                // type={showPassword ? "text" : "password"}
                                id="password"
                                // value={password}
                                // onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                // onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {/* {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} */}
                            </button>
                        </div>
                        {errors && errors.New_Pass && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.New_Pass.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("Confirm_Pass", {
                                    required: {
                                        value: true,
                                        message: "Please confirm your Password"
                                    },
                                    validate: (value) => value === Password || "Password do not match"
                                })}
                                // type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                // value={confirmPassword}
                                // onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                // onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {/* {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} */}
                            </button>
                        </div>
                        {errors && errors.Confirm_Pass && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Confirm_Pass.message}</p>}
                    </div>

                    {/* {passwordError && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            {passwordError}
                        </div>
                    )} */}


                    <button
                        type="submit"
                        // onClick={handleSubmit}
                        // disabled={isSubmitting || !password || !confirmPassword}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Updating Password...
                            </>
                        ) : (
                            'Update Password'
                        )}
                    </button>
                </form>
            </div>
            {
                ResetUserId &&
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
            }
        </div>
    )
}

export default memo(New_Password)
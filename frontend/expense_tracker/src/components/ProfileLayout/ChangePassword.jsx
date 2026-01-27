import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { PasswordChange } from '../../Store/profileSlice'
import { useEffect } from 'react'

const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading,error } = useSelector(state => state?.profile)
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const Password = watch("New_Pass");
    const onChangePass = async (data) => {
        const result = await dispatch(PasswordChange(data))
        if (PasswordChange.fulfilled.match(result)) {
            navigate("/profile")
        }
    }
    useEffect(()=>{
console.log(error);

    },[error])
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 w-full min-w-[70vw] md:min-w-[50vw] lg:min-w-[35vw] min-[450px]:max-w-4xl md:max-w-7xl ">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handleSubmit(onChangePass)} method='post' className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                        {...register("Current_Pass", {
                            required: {
                                value: true,
                                message: "Current Password is required"
                            },
                        })}
                        type="password"
                        name='Current_Pass'
                        // value={passwords.current}
                        // onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-2 focus:outline-blue-600"
                    />
                    {errors && errors.Current_Pass && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Current_Pass.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
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
                        type="password"
                        name='New_Pass'
                        // value={passwords.new}
                        // onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-2 focus:outline-blue-600"
                    />
                    {errors && errors.New_Pass && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.New_Pass.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        {...register("Confirm_Pass", {
                            required: {
                                value: true,
                                message: "Please confirm your Password"
                            },
                            validate: (value) => value === Password || "Password do not match"
                        })}
                        name='Confirm_Pass'
                        type="password"
                        // value={passwords.confirm}
                        // onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-2 focus:outline-blue-600"
                    />
                    {errors && errors.Confirm_Pass && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Confirm_Pass.message}</p>}
                </div>
                <div className="text-[.9rem] font-medium text-gray-700 text-right">
                    <Link to="/Forgot-password"  >Forgot password</Link>
                </div>
                <button
                    disabled={loading}
                    className={`mt-2 w-full px-4 py-3 flex items-center justify-center gap-1  shadow-[#2564eb8f] shadow-lg text-white rounded-xl  ${loading ? 'bg-[#2564eb] opacity-[.75] cursor-not-allowed' : "bg-[#2563EB] hover:bg-blue-700 transition-colors cursor-pointer"}`}
                >
                    {
                        loading ?
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Updating...
                            </>
                            : "   Update Password"
                    }

                </button>
            </form>
        </div>
    )
}

export default ChangePassword
import { FiSave } from "react-icons/fi";
import { useEffect } from "react";
const EditProfileForm = ({ res, register, reset, loading }) => {

    useEffect(() => {
        if (res) {
            reset({
                FullName: res?.user?.FullName,
                Email: res?.user?.Email
            })
        }
    }, [reset, res])

    // const isLoading = false
    return (
        <div className="flex flex-col gap-6 w-full">
            <div action="/update-profile" method="post" className="space-y-6">
                <h3 className="text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.5035rem+0.7172vw,1.85rem)] font-semibold text-gray-800 border-b border-b-gray-300 pb-2 w-full">Personal Information</h3>
                <div className=" flex flex-wrap md:flex-nowrap justify-around lg:grid  grid-cols-2 gap-4 place-items-center">
                    <div className="w-full max-w-md  lg:max-w-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <input name="FullName" {...register("FullName")} className='w-full pl-5 lg:pl-7 pr-4 py-3 border rounded-lg text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]  ' placeholder="John Doe" />
                        </div>
                    </div>
                    <div className="w-full max-w-md  lg:max-w-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <input name="Email" {...register("Email")} className='w-full pl-5 lg:pl-7 pr-4 py-3 border rounded-lg text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)] ' placeholder="JohnDoe@gmail.com" />
                        </div>
                    </div>

                </div>
                <div className="flex justify-around lg:justify-end pt-8 border-t border-t-gray-300 mt-8">
                    <button
                        type="submit" className={`flex cursor-pointer items-center px-3 md:px-8 py-3 rounded-lg font-medium transition-all ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                            } text-white shadow-lg`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave className="w-5 h-5 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfileForm
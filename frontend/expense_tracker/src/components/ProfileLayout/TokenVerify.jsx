
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { ResetPassTokenVerify } from '../../Store/profileSlice';
import toast, { Toaster } from 'react-hot-toast';

const TokenVerify = () => {


    const { token } = useParams();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        const TokenVerify = async () => {
            const res = await dispatch(ResetPassTokenVerify(token))
console.log(res);

            if (ResetPassTokenVerify.fulfilled.match(res)) {
                navigate("/New_Password")
                toast.success("Reset link verified successfully", {
                    id: 'Reset',
                }, 600)
            }
        }
        TokenVerify()
    }, [token, dispatch, navigate])
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Reset Link</h2>
                    <p className="text-gray-600">Please wait while we verify your password reset token...</p>
                </div>

                <div className="flex justify-center">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TokenVerify
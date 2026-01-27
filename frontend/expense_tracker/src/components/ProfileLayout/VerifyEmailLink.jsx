import { useEffect } from "react"
import { MdMail } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { VerifyEmailToken } from "../../Store/profileSlice"
import toast from "react-hot-toast"
import EmailVerified from "./EmailVerified"

const VerifyEmailLink = ({ Email }) => {
    const { Submitted, error } = useSelector(state => state?.profile)
    const { token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const handleVerifyWithLink = async () => {
            const res = await dispatch(VerifyEmailToken(token))

            if (VerifyEmailToken.fulfilled.match(res)) {



                // toast.success("Reset link verified successfully", {
                //     id: 'Reset',
                // }, 600)
            }
        }

        if (token) {
            handleVerifyWithLink(token);
        }
    }, [token, dispatch, navigate])
    if (Submitted) {
        return (
            <EmailVerified />
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 relative">
                        <MdMail className="w-8 h-8 text-blue-600" />
                        <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Verifying Your Email</h2>
                    <p className="text-gray-600 mb-2">Please wait while we verify your email address...</p>
                    <p className="text-sm text-gray-500"> {Email}</p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="animate-pulse">●</span> Checking verification token...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailLink
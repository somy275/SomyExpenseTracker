import { useEffect, useRef } from "react";
import { useState } from "react";
import { FiArrowLeft, FiMail, FiRefreshCw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmailRandomToken } from "../../Store/profileSlice";
import EmailVerified from "./EmailVerified";
import { useNavigate } from "react-router";


const EmailVerifyCode = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isVerified, setIsVerified] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);
    const { loading, Submitted } = useSelector(state => state?.profile)
     const { Email } = useSelector(state => state?.auth?.user?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (timeLeft > 0 && !isVerified) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, isVerified]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const handleCodeChange = (index, value) => {
        if (value.length > 1) return;
        if (/^[A-Za-z?.,<>@!#$%^&*/:;']+$/.test(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        // setError('');

        setVerificationCode(newCode);
        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits are entered
        if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
            handleVerifyCode(newCode.join(''));
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text').replace(/\s/g, '').toUpperCase();

        if (pastedText.length === 6 && /^[0-9]+$/.test(pastedText)) {
            const newCode = pastedText.split('');
            setVerificationCode(newCode);
            handleVerifyCode(pastedText);
        }
    };

    const handleVerifyCode = async (code) => {
        const res = await dispatch(VerifyEmailRandomToken({ code }))
    }

    if (Submitted) {
        return (
            <EmailVerified />
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiMail className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </h1>

                        <p className="text-gray-600">
                            We've sent a 6-digit verification code to
                        </p>
                        <p className="text-gray-900 font-semibold">
                            {Email}
                        </p>
                    </div>

                    {/* Verification Code Inputs */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Enter verification code
                        </label>

                        <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {/* {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )} */}

                    {/* Loading State */}
                    {loading && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center space-x-2">
                            <FiRefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                            <p className="text-sm text-blue-700">Verifying...</p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={() => handleVerifyCode(verificationCode.join(''))}
                        disabled={verificationCode.some(digit => digit === '') || loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>

                    {/* Resend Section */}
                    <div className="text-center space-y-3">
                        {timeLeft > 0 ? (
                            <p className="text-sm text-gray-500">
                                Didn't receive the code? Resend in {formatTime(timeLeft)}
                            </p>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Didn't receive the code?
                                </p>
                                <button
                                    // onClick={handleResendCode}
                                    disabled={isResending}
                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:opacity-50 transition-colors"
                                >
                                    {isResending ? 'Sending...' : 'Resend verification code'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button onClick={() => navigate(-1)} className="flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors w-full">
                            <FiArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back to login</span>
                        </button>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Having trouble?
                        <a href="mailto:support@company.com" className="text-blue-600 hover:text-blue-700 ml-1">
                            Contact support
                        </a>
                    </p>
                </div>
            </div>
        </div >

    )
}

export default EmailVerifyCode
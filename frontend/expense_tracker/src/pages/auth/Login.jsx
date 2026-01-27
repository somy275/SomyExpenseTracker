import Input from '../../components/Inputs/Input';
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Social_btn from '../../components/Social/Social_btn';
import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router"
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../Store/authSlice';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state?.auth);

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onLogin = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      toast.success("Login successfully", {
        id: 'Login Error'
      });
      navigate("/")
    }
    else if (error) {
      toast.error(error, {
        id: 'Login Error'
      });
    }


  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md md:max-w-[550px] md:w-[70%] lg:w-full  lg:max-w-[90%] mt-4 ">
        {/* Logo/Brand Section */}
        <div className='lg:flex overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-xl items-center justify-between gap-[.3rem] rounded-4xl '>
          <div className="relative text-center mb-8 md:py-[2rem] lg:py-0 pt-6 lg:w-[55%]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4  shadow-lg">
              <span className="text-white text-2xl font-bold">€</span>
            </div>
            <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">ExpenseTracker</h1>
            <p className="text-[#FFFFFF]">Sign in to manage your expenses</p>
            <div className="absolute -bottom-[45%] md:-bottom-[30%] lg:-bottom-60 -right-5 w-32 h-32 bg-white opacity-[.1] rounded-full"></div>
            <div className="absolute -top-[10%]  lg:-top-48 -left-6 w-24 h-24  bg-white opacity-[.1] rounded-full"></div>

          </div>

          {/* Login Form */}
          <div className="bg-white  rounded-br-2xl  border border-gray-100 p-8 lg:w-[45%]">
            <form onSubmit={handleSubmit(onLogin)} action="/login" method='post' className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input

                    register={register}
                    placeholder={"john@example.com"}
                    type={"text"}
                    id={"email"}
                    name={"Email"}
                    rules={{
                      required: {
                        value: true,
                        message: "Email is required"
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                        message: 'Enter a valid email address'
                      }
                    }}
                  />
                </div>
                {errors && errors.Email && <p className='block text-sm font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2 '>{errors.Email.message}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative ">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input

                    register={register}
                    placeholder={"123456.."}
                    type={"password"}
                    id={"password"}
                    name={"Password"}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Password is required"
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 6 characters long"
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: "Password must contain at least one uppercase letter, lowercase letter, number and special character"
                        }
                      }
                    }
                  />

                </div>
                {errors && errors.Password && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Password.message}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    // onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to='/Forgot-password'
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button type='submit'
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <Social_btn />

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up here
              </Link>
            </div>
          </div>

        </div>
        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 ExpenseTracker. All rights reserved.</p>
        </footer>
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

export default Login
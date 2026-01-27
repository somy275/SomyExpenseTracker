
import { useState } from 'react'
import Input from '../../components/Inputs/Input';
import { MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { FaLock, FaCamera } from "react-icons/fa";
import Social_btn from '../../components/Social/Social_btn';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router';
import { MdDeleteForever } from "react-icons/md";
import axios from "axios"
const Signup = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const password = watch("Password"); // Watch the password

  const handleRemoveImage = () => {
    setImagePreview(null)
    setProfileImage(null)
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const onSignup = async (data) => {

    try {
      setIsLoading(true);
      // Step 1: Upload the image if exists
      let imageURL = null;
      if (profileImage) {
        const formdata = new FormData()
        formdata.append("image", profileImage)
        const imageUploadResponse = await axios.post("/api/v1/auth/upload-image", formdata)

        imageURL = imageUploadResponse.data.imageUrl


      }
      //Step 2. Add image URL to the signup data
      const updatedData = {
        "avatar": imageURL,
        ...data
      }
      //Step 3. Register the User
      await axios.post("/api/v1/auth/register", updatedData,{
        withCredentials:true
      })

      navigate("/login")
    } catch (err) {
      console.log(err);

    }


    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-[550px] md:w-[70%] lg:w-full lg:max-w-[90%] mt-4">
        {/* Logo/Brand Section */}
        <div className='lg:flex overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-xl items-center justify-between gap-[.3rem] rounded-4xl'>
          <div className="relative text-center mb-8 md:py-[2rem] lg:py-0 pt-6 lg:w-[55%]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">€</span>
            </div>
            <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">ExpenseTracker</h1>
            <p className="text-[#FFFFFF]">Create your account to start tracking</p>
            <div className="absolute -bottom-[45%] md:-bottom-[30%] lg:-bottom-98 -right-5 w-32 h-32 bg-white opacity-[.1] rounded-full"></div>
            <div className="absolute -top-[10%] lg:-top-88 -left-6 w-24 h-24 bg-white opacity-[.1] rounded-full"></div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-br-2xl border border-gray-100 p-8 lg:w-[45%]">
            <form onSubmit={handleSubmit(onSignup)} encType='multipart/form-data' className="space-y-6">

              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FaCamera className="text-gray-400 w-8 h-8" />
                    )}
                  </div>
                  {
                    !imagePreview ? <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      <FaCamera className="w-3 h-3" />
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        name='avatar'

                      />
                    </label>

                      : <label
                        htmlFor="profilePicture"
                        className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-700 transition-colors shadow-lg"
                      >
                        <MdDeleteForever onClick={handleRemoveImage} className="w-3.8 h-3.8" />
                      </label>
                  }


                </div>
                <p className="text-sm text-gray-500 mt-2">Upload profile picture</p>
              </div>

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <MdPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    register={register}
                    placeholder={"John Doe"}
                    type={"text"}
                    id={"fullname"}
                    name={"FullName"}
                    rules={{
                      required: {
                        value: true,
                        message: "Full name is required"
                      },
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters long"
                      }
                    }}
                  />
                </div>
                {errors && errors.FullName && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.FullName.message}</p>}
              </div>

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
                    type={"email"}
                    id={"email"}
                    name={"Email"}
                    rules={{
                      required: {
                        value: true,
                        message: "Email is required"
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address'
                      }
                    }}
                  />
                </div>
                {errors && errors.Email && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Email.message}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    register={register}
                    placeholder={"Password"}
                    type={"password"}
                    id={"password"}
                    name={"Password"}
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required"
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Password must contain at least one uppercase letter, lowercase letter, number and special character"
                      }
                    }}
                  />
                </div>
                {errors && errors.Password && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.Password.message}</p>}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    register={register}
                    placeholder={"Confirm Password"}
                    type={"password"}
                    id={"confirmPassword"}
                    name={"ConfirmPassword"}
                    rules={{
                      required: {
                        value: true,
                        message: "Please confirm your password"
                      },
                      validate: (value) => value === password || "Password do not match"
                    }}
                  />
                </div>
                {errors && errors.ConfirmPassword && <p className='block text-xs font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2'>{errors.ConfirmPassword.message}</p>}
              </div>

              {/* Terms and Conditions */}


              {/* Signup Button */}
              <button
                type='submit'
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
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

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign in here
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 ExpenseTracker. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}


export default Signup
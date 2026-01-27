import React, { useState } from 'react'
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
const Input = ({name, register, placeholder, type, id, rules }) => {
    const [showPassword, setshowPassword] = useState(false)
    const togglePassword = () => {
        setshowPassword(!showPassword);


    }
    return (
        <div className="relative">
            <input name={name} {...register(name, 
                rules
            )} id={id} type={type == "password" ? showPassword ? "password" : "text" : type} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-2 focus:outline-blue-500 focus:border-none"  placeholder={placeholder}  />
            {
                type == "password" && (
                    showPassword ?
                        <AiFillEyeInvisible className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"' onClick={togglePassword} />
                        : <AiFillEye className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"' onClick={togglePassword} />
                )
            }
        </div>
    )
}

export default Input
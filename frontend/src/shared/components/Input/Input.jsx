import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Input = ({ value, placeholder, type, label, onChange, readOnly, className }) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShoowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>
      <div className='input-box'>
        <input
          type={type == "password" ? showPassword ? 'text' : 'password' : type}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none ${className}`}
          value={value}
          onChange={(e) => onChange(e)} />
        {
          type == "password" && <>
            {
              showPassword ? (
                <FaRegEye
                  size={22}
                  className='text-primary cursor-pointer'
                  onClick={() => toggleShoowPassword()} />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  className='text-slate-400 cursor-pointer'
                  onClick={() => toggleShoowPassword()}
                />

              )
            }
          </>
        }
      </div>
    </div>
  )
}

export default Input
import React, { useContext, useState } from 'react'
import AuthInput from "../Input/AuthInput";
import { validateEmail } from '../../utils/helper'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'
export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

   //Handle Login Form Submit
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(validateEmail(email)){
      setError("Please Enter a valid Email Address");
      return;
    }
    if(!password){
      setError("Please Enter the Password");
      return;
    }
    setError("")
    //Login Api Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      })
      
      const{token,role} = response.data
      if(token){
        localStorage.setItem('token',token)
        updateUser(response.data)
        //Redirect based on role
        if(role === 'admin'){
          navigate('/admin/dashboard')
        }else{
          navigate('/user/dashboard')
        }
      }
    }catch(error){
     if(error.response && error.response.data.message){
      setError(error.response.data.message)
     }else{
      setError("Something went wrong . please try again")
     }
    }
  }
  return (
      <form onSubmit={handleSubmit}>

      <AuthInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder='example@gmail.com'
        type='email'
        required={true}
      />

      <AuthInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Min 8 characters'
        label="Password"
        type="password"
        required={true}
      />
       {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
      <div className="mb-6 flex items-center justify-between">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <button className="text-emerald-400">
          Forgot password?
        </button>

      </div>

      <button className="w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
        Sign in
      </button>
    </form>
  );
}
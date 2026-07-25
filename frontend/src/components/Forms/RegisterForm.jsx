import React, { useContext, useState } from 'react'
import AuthInput from "../Input/AuthInput";
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("")

  const [error, setError] = useState(null)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()
     //Handle SignUp Form Submit
    const handleSubmit = async (e) =>{
      e.preventDefault()
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName,
        email,
        password,
        adminInviteToken
      })
      const{role,token} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data)
      }
       //Redirect based on role
        if(role === 'admin'){
          navigate('/admin/dashboard')
        }else{
          navigate('/user/dashboard')
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
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        label="Full Name"
        type="text"
        required={true}
      />

      <AuthInput
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         label="Email Address"
         type='email'
         required={true}
      />
     <div className='flex gap-3.5'>
      <AuthInput
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         label="Password"
         placeholder='Min 8 characters'
         type="password"
         required={true}
      />

      <AuthInput
         value={adminInviteToken}
         onChange={(e)=>setAdminInviteToken(e.target.value)}
         label="Admin Invite Token"
         placeholder='6 Digit Code'
         type="text"
         required={false}
      />
     </div>
     {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
      <label className="mb-6 flex items-center gap-2">
        <input type="checkbox" />
        I agree to the Terms
      </label>

      <button className="w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
        Create account
      </button>
    </form>
  );
}
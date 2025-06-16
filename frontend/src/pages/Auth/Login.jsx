import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/input/input'
import { validateEmail } from '../../utils/helper'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'
const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  
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
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-x5 text-slate-700 mt-[5px] mb-6'>
        please enter your details for login
      </p>

      <form onSubmit={handleSubmit}>
         <Input 
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         label="Email Address"
         placeholder='example@gmail.com'
         type="text"
         />
         <Input 
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         label="Password"
         placeholder='Min 8 characters'
         type="password"
         />
         {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
         <button type='submit' className='btn-primary'>Login</button>
         <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{""}
          <Link className='font-medium text-primary underline' to="/signup">
          SignUp
          </Link>
         </p>
      </form>
      </div>
    </AuthLayout>
  )
}

export default Login
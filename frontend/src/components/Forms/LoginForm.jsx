import React, { useContext, useState } from 'react'
import AuthInput from "../Input/AuthInput";
import { validateEmail } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/useContext'
import { loginUser } from '../../api/AuthApi'
export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { updateUser, fetchUser } = useContext(UserContext)
  const navigate = useNavigate()

  //Handle Login Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please Enter a valid Email Address");
      return;
    }
    if (!password) {
      setError("Please Enter the Password");
      return;
    }
    setError("")
    //Login Api Call
    try {
      const response = await loginUser({
        email,
        password
      })
      const { token, role } = response.data
      if (token) {
        localStorage.setItem('token', token)
        updateUser(response.data)
        //Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard')
          fetchUser()
        } else {
          navigate('/user/dashboard')
          fetchUser()
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
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
        minLength={8}
      />
      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button className="w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
        Sign in
      </button>
      <div className="mt-2 flex items-center justify-end">

        <button
          type="button"
          onClick={() => navigate('/auth/forgot-password')}
          className="text-emerald-400 hover:underline"
        >
          Forgot password?
        </button>

      </div>
    </form>
  );
}

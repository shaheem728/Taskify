import React, { useContext, useState } from 'react'
import AuthInput from "../Input/AuthInput";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/useContext'
import { registerUser } from '../../api/AuthApi/AuthApi'

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("")

  const [error, setError] = useState(null)
  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()
  //Handle SignUp Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await registerUser({
        name: fullName,
        email,
        password,
        adminInviteToken
      })
      const { role, token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
      }
      //Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
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
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        label="Full Name"
        placeholder='John Doe'
        type="text"
        required={true}
      />

      <AuthInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email Address"
        placeholder='example@gmail.com'
        type='email'
        required={true}
      />
      <AuthInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder='Min 8 characters'
        type="password"
        required={true}
      />

      <AuthInput
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        label="Organization Name"
        placeholder='Organization Name'
        type="text"
        required={false}
      />
      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button className="w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
        Create account
      </button>
    </form>
  );
}

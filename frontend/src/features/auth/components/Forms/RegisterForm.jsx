import React, { useContext, useState } from 'react'
import AuthInput from "@/shared/components/input/AuthInput";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/shared/context/useContext'
import { registerUser } from '@/features/auth/api/authAPI'
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null)
  const { updateUser, fetchUser } = useContext(UserContext)
  const navigate = useNavigate()
  //Handle SignUp Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await registerUser({
        name: fullName,
        email,
        password,
        organizationName
      })
      const { role, token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
      }
      toast.success("Organization registered successfully");
      //Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard')
        fetchUser()
      } else {
        navigate('/user/dashboard')
        fetchUser()
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong . please try again")
      }
    } finally {
      setIsLoading(false);
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
        minLength={8}
      />

      <AuthInput
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        label="Organization Name"
        placeholder='Organization Name'
        type="text"
        minLength={4}
        required={false}
      />
      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button disabled={isLoading} className="w-full rounded-xl bg-emerald-400 py-3 font-semibold text-black">
        {isLoading ? 'Creating account ...' : 'Create a ccount'}
      </button>
    </form>
  );
}

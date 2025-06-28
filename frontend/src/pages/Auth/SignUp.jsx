import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector'
import Input from '../../components/Input/Input'
import { Link,useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'
import uploadImage from '../../utils/uploadimage'
const SignUp = () => {
    const[profilePic,setProfilePic] = useState(null);
    const[fullName,setFullName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[adminInviteToken,setAdminInviteToken]=useState("")

    const[error,setError] = useState(null)
    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate()
    //Handle SignUp Form Submit
    const handleSubmit = async (e) =>{
      e.preventDefault()
      let profileImageUrl = ""
    try{
      //Upload Image if present
      if(profilePic){
       const imgUploadRes = await uploadImage(profilePic);
       profileImageUrl = imgUploadRes.imageUrl || ''
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName,
        email,
        password,
        profileImageUrl,
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
    <AuthLayout>
    <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='font-semibold text-xl text-black'>Create An Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us today by entering your detail below
        </p>
        <form onSubmit={handleSubmit}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
         value={fullName}
         onChange={(e)=>setFullName(e.target.value)}
         label="Full Name"
         placeholder='john'
         type="text"
         />
            <Input 
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         label="Email Address"
         placeholder='johnexample@gmail.com'
         type="text"
         />
         <Input 
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         label="Password"
         placeholder='Min 8 characters'
         type="password"
         />
         <Input 
         value={adminInviteToken}
         onChange={(e)=>setAdminInviteToken(e.target.value)}
         label="Admin Invite Token"
         placeholder='6 Digit Code'
         type="text"
         />
         </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
         <button type='submit' className='btn-primary'>SIGN UP</button>
         <p className='text-[13px] text-slate-800 mt-3'>
          Already an account?{""}
          <Link className='font-medium text-primary underline' to="/login">
          Login
          </Link>
         </p>

            
        </form>
    </div>

    </AuthLayout>
  )
}

export default SignUp
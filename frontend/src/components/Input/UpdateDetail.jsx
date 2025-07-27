import React, { useContext, useState } from 'react'
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector'
import Input from '../../components/Input/Input'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/useContext'
import uploadImage from '../../utils/uploadimage'
import { IoClose } from "react-icons/io5";
const UpdateDetail = () => {
 const[profilePic,setProfilePic] = useState(null);
    const[fullName,setFullName] = useState("");
    const[email,setEmail] = useState("");
    const[adminInviteToken,setAdminInviteToken]=useState("")

    const[error,setError] = useState(null)
    const {user,updateUser,setEditing} = useContext(UserContext)
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
      const response = await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE,{
        name:fullName,
        email,
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
    <div className='fixed bg-black/50 min-h-screen z-10 w-screen  flex flex-col  justify-center items-center top-0 left-0 '>
      <div className='relative flex flex-col bg-white justify-center items-center p-4 rounded-2xl'>
        <div className='absolute top-2 right-2 cursor-pointer'>
          <IoClose onClick={()=>setEditing(false)} size={30}/>
        </div>
        <h3 className='font-semibold text-xl text-black mb-3'>Profile</h3>
        <form onSubmit={handleSubmit}>
            <ProfilePhotoSelector image={user?.profileImageUrl||profilePic} setImage={setProfilePic}/>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input 
         value={user?.name||fullName}
         onChange={(e)=>setFullName(e.target.value)}
         label="Full Name"
         placeholder='john'
         type="text"
         />
            <Input 
         value={user?.email||email}
         onChange={(e)=>setEmail(e.target.value)}
         label="Email Address"
         placeholder='johnexample@gmail.com'
         type="text"
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
         <button type='submit' className='btn-primary'>Submit</button>      
            
        </form>
    </div>
   </div>
  )
}

export default UpdateDetail



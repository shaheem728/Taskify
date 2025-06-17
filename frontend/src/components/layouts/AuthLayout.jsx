import React from 'react'
import { assets } from '../../assets/images/assets'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw px-12 pt-8 pb-12]'>
            <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            {children}
        </div>

        <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bg_image.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
            <img src={assets.login} className='w-64 lg:w-[90%]'/>
        </div>
    </div>
  )
}

export default AuthLayout
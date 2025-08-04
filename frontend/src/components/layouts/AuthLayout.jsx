import React from 'react'
import { assets } from '../../assets/images/assets'

const AuthLayout = ({children}) => {
  return (
    <div className='flex h-[100vh] overflow-y-hidden'>
       <div className="hidden md:flex w-[40vw]  items-center justify-center bg-blue-50 bg-[url('/bg_image.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
            <img src={assets.login} className='w-64 lg:w-[90%]'/>
        </div>
       <div className='w-screen h-auto md:w-[60vw] px-12 pt-8 pb-12'>
      <div className='flex flex-col leading-tight'>
        <h2 className='text-lg font-medium text-black m-0 border-0'>Taskify</h2>
        <span className='text-[9px] text-gray-500'>Task Manager</span>
      </div>
      {children}
    </div>

    </div>
  )
}

export default AuthLayout
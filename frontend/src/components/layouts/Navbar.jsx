import React, { useState } from 'react'
import {CheckCircle2} from 'lucide-react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({activeMenu}) => {
    const [openSideMenu,setOpenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 bg-blue-50 border border-b border-gray-200/50 backdrop-blur-[2px] py-3 md:px-7 sticky top-0 z-30'>
     <button
            className='block lg:hidden text-black ml-3'
            onClick={()=>setOpenSideMenu(!openSideMenu)}>
               {openSideMenu?(
                               <HiOutlineX className='text-2xl'/>
                           ):(
                             <HiOutlineMenu className='text-2xl'/>
               
                           )}
            </button>
             {/* <div className='flex flex-col leading-tight'>
              <h2 className='text-lg font-medium text-black m-0 border-0'>Taskify</h2>
              <span className='text-[9px] text-gray-500'>Task Manager</span>
            </div> */}
              <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25">
            <CheckCircle2 className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Taskify</span>
        </div>
              {
          openSideMenu && (
            <div className="fixed top-[50px]  bg-white block lg:hidden">
              <SideMenu activeMenu={activeMenu}/>
            </div>
          )
        }
    </div>
  )
}

export default Navbar
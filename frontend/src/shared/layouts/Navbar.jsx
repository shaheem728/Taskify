import React, { useContext, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { UserContext } from '@/shared/context/useContext'
import UserAvatar from '@/shared/components/profile/UserAvatar '
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const { user, setEditing } = useContext(UserContext)

  return (
    <div className='flex items-center justify-between bg-blue-50 border border-b border-gray-200/50 shadow backdrop-blur-[2px] py-2 px-4 md:px-7 sticky top-0 z-30 rounded-b-4xl'>
      <div className='flex items-center gap-3 md:gap-5'>
        <button
          className='block lg:hidden text-black'
          onClick={() => setOpenSideMenu(!openSideMenu)}>
          {openSideMenu ? (
            <HiOutlineX className='text-2xl' />
          ) : (
            <HiOutlineMenu className='text-2xl' />
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25">
            <CheckCircle2 className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Taskify</span>
        </div>
      </div>

      {user && (
        <button
          type='button'
          onClick={() => setEditing(true)}
          className='flex items-center  transition-colors cursor-pointer shadow-2xl'
        >
          <UserAvatar name={user?.user?.name} />
        </button>
      )}

      {openSideMenu && (
        <div className="fixed top-[54px] left-1 block lg:hidden z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar

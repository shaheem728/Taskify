import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '@/shared/context/useContext'
import UpdateDetail from '@/shared/components/profile/UpdateDetail'
const DashboardLayout = ({ children, activeMenu }) => {
  const { user, edit } = useContext(UserContext)
  return (
    <div className=''>
      <Navbar activeMenu={activeMenu} />
      {
        user && (
          <div className='flex'>
            <div className={`${edit ? '' : 'hidden'}`}>
              <UpdateDetail />
            </div>
            <div className='hidden md:block w-64 shrink-0 ml-4 mt-2'>
              <div className='fixed top-[70px] w-64 z-20'>
                <SideMenu activeMenu={activeMenu} />
              </div>
            </div>
            <div className='grow min-w-0 mx-5'>{children}</div>
          </div>

        )
      }

    </div>
  )
}

export default DashboardLayout
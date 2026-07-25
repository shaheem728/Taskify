import React, { useContext } from 'react'
import  Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/useContext'
import UpdateDetail from  '../../components/Input/UpdateDetail'
const DashboardLayout = ({children,activeMenu}) => {
  const {user,edit} = useContext(UserContext)
  return (
    <div className=''>
      <Navbar activeMenu={activeMenu}/>
      {
        user && (
        <div className='flex'>
          <div className={`${edit ? '' :'hidden'}`}>
          <UpdateDetail/>
          </div>
        <div className='md:block hidden'>
          <SideMenu activeMenu={activeMenu}/>
        </div>
        <div className='grow mx-5'>{children}</div>
       </div>

        )
      }
    
    </div>
  )
}

export default DashboardLayout
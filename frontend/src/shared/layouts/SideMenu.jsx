import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/shared/context/useContext'
import { Building2, LogOut } from 'lucide-react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '@/shared/utils/data'
import ConfirmModal from '@/shared/components/ui/ConfirmModal';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [isLogout, setIsLogout] = useState(false)
  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === "logout") {
      setIsLogout(true);
      return;
    }
    navigate(route)
  }

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
    }
    return () => { };
  }, [user])

  return (
    <div className='w-64 h-[calc(100vh-85px)] bg-blue-50 border border-gray-200/50 rounded-3xl z-10 flex flex-col justify-between overflow-hidden shadow-sm'>
      <div className='overflow-y-auto flex-1'>
        <div className='p-5 border-b border-gray-200/50 mb-3'>
          <div className='flex flex-col bg-gray-200  p-10 rounded-2xl items-center gap-2.5 text-gray-800'>
            <Building2 className='text-primary shrink-0' size={24} />
            <h2 className='text-lg md:text-xl font-semibold truncate'>
              {user?.organization?.orgname || "Organization"}
            </h2>
          </div>
        </div>
        {
          sideMenuData.map((item, index) => (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? " text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""}py-3 px-6 mb-3 cursor-pointer`}
              onClick={() => handleClick(item.path)}>
              <item.icon className="text-xl" />
              {item.label}
            </button>
          ))
        }
      </div>

      <div className='p-4 border-t border-gray-200/60'>
        <button
          type='button'
          onClick={() => setIsLogout(true)}
          className='w-full flex items-center gap-4 text-[15px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50/80 py-3 px-4 rounded-2xl transition-all duration-200 cursor-pointer'
        >
          <LogOut size={20} className='text-red-600' />
          Logout
        </button>
      </div>

      <ConfirmModal
        isOpen={isLogout}
        onClose={() => setIsLogout(false)}
        title="Logout"
        message="Are you sure you want to logout?"
        cancelText="Cancel"
        confirmText="Logout"
        maxWidth="xl"
        confirmButtonVariant="danger"
        confirmIcon={<LogOut size={18} />}
        onConfirm={handelLogout}
      />
    </div>
  )
}

export default SideMenu

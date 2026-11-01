import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/useContext'
import { FaEdit } from "react-icons/fa";
import { LogOut } from 'lucide-react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data'
import { assets } from '../../assets/images/assets';
import ConfirmModal from '../Ui/ConfirmModal';
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, setEditing } = useContext(UserContext);
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
    <div className='w-64 h-[calc(100vh-75px)] bg-blue-50 border-r border-gray-200/50 sticky top-[50px] left-10 rounded-3xl z-10'>
      <div className='flex items-end justify-end pt-2 pr-2'>
        <button type='button' onClick={() => setEditing(true)} className='text-primary hover:text-blue-500 h-4 cursor-pointer' ><FaEdit /></button>
      </div>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
          <img src={user?.user?.profileImageUrl?.length > 1 ? user?.user?.profileImageUrl : assets.profile_pic}
            alt="profile"
            className='w-20 h-20 object-fit  rounded-full border border-primary  ' />
        </div>
        {user?.role === "admin" && (
          <div className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>Admin</div>
        )}
        <h5 className='text-gray-950 font-medium leading-6 mt-3'>{user?.user?.name || ""}</h5>
        <p className='text-[12px] text-gray-500'>{user?.user?.email || ""}</p>
      </div>
      {
        sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? " text-primary  bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""}py-3 px-6 mb-3 cursor-pointer`}
            onClick={() => handleClick(item.path)}>
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))
      }



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
import React from 'react';
import { assets } from '../assets/images/assets';

const AssignedUserList = ({ users = [] }) => {
  if (!users.length) {
    return <p className='text-xs text-slate-400 mt-1'>No users assigned</p>;
  }

  return (
    <div className='mt-1 space-y-1 '>
      {users.map((user) => (
        <div key={user._id} className=' flex items-center gap-3 '>
          <img
            src={user?.profileImageUrl?.trim() || assets.profile_pic}
            alt={user?.name || 'Assigned user'}
            className='w-7.5 h-7.5 rounded-full object-fit border border-slate-200'
          />
          <p className='text-[12px] md:text-[13px] font-medium text-gray-700'>{user?.name || 'Unnamed user'}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignedUserList;

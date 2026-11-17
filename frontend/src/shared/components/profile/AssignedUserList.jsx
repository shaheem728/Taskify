import React from 'react';
import { assets } from '@/features/assets/images/assets';
import UserAvatar from '@/shared/components/profile/UserAvatar '

const AssignedUserList = ({ users = [] }) => {
  if (!users.length) {
    return <p className='text-sm text-slate-400 mt-1'>No users assigned</p>;
  }

  return (
    <div className='mt-1 flex flex-wrap gap-3'>
      {users.map((user) => (
        <div key={user._id} className=' flex items-center gap-1 border border-gray-200 p-1 rounded-2xl hover:shadow'>
         <UserAvatar name={user?.name} size='h-6 w-6'/>
          <p className='text-[12px] md:text-[13px] font-medium text-gray-700'>{user?.name || 'Unnamed user'}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignedUserList;

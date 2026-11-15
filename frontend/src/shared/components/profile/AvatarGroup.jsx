import React from 'react'
import { assets } from '@/features/assets/images/assets';

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
    const visibleAvatars = avatars.slice(0, maxVisible);
    const extraCount = avatars.length - maxVisible;

    const handleImageError = (e) => {
        e.currentTarget.onerror = null; // prevent infinite loop
        e.currentTarget.src = assets.profile_pic;
    };

    return (
        <div className='flex items-center'>
            {visibleAvatars.map((avatar, index) => (
                <img
                    key={avatar?._id || index}
                    src={avatar?.profileImageUrl?.trim() || assets.profile_pic}
                    alt={avatar?.name || 'User avatar'}
                    onError={handleImageError}
                    className='w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover'
                />
            ))}
            {extraCount > 0 && (
                <div className='w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3'>
                    +{extraCount}
                </div>
            )}
        </div>
    )
}

export default AvatarGroup
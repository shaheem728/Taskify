import React, { useEffect, useState } from 'react'
import axiosInstance from '@/shared/api/axios'
import { LuUsers } from 'react-icons/lu'
import { UserCheck, UserPlus } from 'lucide-react'
import Modal from '@/shared/components/ui/Modal'
import { assets } from '@/features/assets/images/assets'

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedUsers, setTempSelectedUsers] = useState([])
  const [search, setSearch] = useState('')

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance(`/api/users`)
      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching users", error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const openUserSelector = () => {
    setTempSelectedUsers([...selectedUsers])
    setSearch('')
    setIsModalOpen(true)
  }

  const selectedUserAvatars = allUsers.filter((user) => selectedUsers.includes(user._id))

  const filteredUsers = allUsers.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers)
    setIsModalOpen(false)
  }

  return (
    <div className='space-y-3 '>
      {selectedUserAvatars.length === 0 && (
        <button
          className='card-btn flex items-center justify-end gap-2'
          onClick={openUserSelector}
        >
          <LuUsers className='text-base' />
          Add Members
        </button>
      )}
      {/* ── Selected members section ── */}
      {selectedUserAvatars.length > 0 && (
        <div className=''>
          {/* Header row */}
          <div className='flex flex-col gap-4'>
            <button
              className='card-btn w-35! flex items-center gap-2'
              onClick={openUserSelector}
            >
              <LuUsers className='text-base' />
              Edit Members
            </button>
            <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
              {selectedUserAvatars.length} Member{selectedUserAvatars.length > 1 ? 's' : ''} Assigned
            </span>

          </div>

          {/* Profile cards grid */}
          <div className='flex flex-wrap gap-2 mt-1'>
            {selectedUserAvatars.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-2.5 bg-gray-200  rounded-xl px-3 py-2 min-w-0'
              >
                {/* Avatar */}
                <img
                  src={user.profileImageUrl?.trim() || assets.profile_pic}
                  alt={user.name}
                  className='w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0'
                  onError={e => { e.target.src = assets.profile_pic }}
                />
                {/* Info */}
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-gray-800  truncate leading-tight'>
                    {user.name}
                  </p>
                  <p className='text-[11px] text-gray-500 truncate leading-tight'>
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Select Team Members'
        maxWidth='md'
      >
        {/* Search bar */}
        <div className='relative mb-1'>
          <LuUsers className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
          <input
            type='text'
            placeholder='Search by name or email…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white dark:bg-gray-700 text-gray-800  placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition'
          />
        </div>

        {/* Selection counter */}
        {tempSelectedUsers.length > 0 && (
          <div className='flex items-center gap-1.5 text-xs text-primary font-medium mb-1'>
            <UserCheck size={13} />
            {tempSelectedUsers.length} selected
          </div>
        )}

        {/* User list */}
        <div className='space-y-2 h-[52vh] overflow-y-auto pr-1'>
          {filteredUsers.length === 0 && (
            <p className='text-sm text-center text-gray-400 py-10'>No users found</p>
          )}
          {filteredUsers.map((user) => {
            const isSelected = tempSelectedUsers.includes(user._id)
            return (
              <div
                key={user._id}
                onClick={() => toggleUserSelection(user._id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-150 group
                  ${isSelected
                    ? 'bg-primary/8 border-primary/30 shadow-sm'
                    : 'bg-white  border-gray-100  hover:bg-gray-50 '
                  }`}
              >
                {/* Avatar */}
                <div className='relative flex-shrink-0'>
                  <img
                    src={user.profileImageUrl?.trim() || assets.profile_pic}
                    alt={user.name}
                    className='w-11 h-11 rounded-full object-cover ring-2 ring-white  shadow'
                    onError={e => { e.target.src = assets.profile_pic }}
                  />
                  {isSelected && (
                    <span className='absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow'>
                      <svg viewBox='0 0 10 8' fill='none' className='w-2.5 h-2.5'>
                        <path d='M1 4l2.5 2.5L9 1' stroke='white' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className={`text-sm font-semibold truncate ${isSelected ? 'text-primary' : 'text-gray-800'}`}>
                    {user.name}
                  </p>
                  <p className='text-xs text-gray-500  truncate'>{user.email}</p>
                </div>

                {/* Checkbox */}
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-colors duration-150
                    ${isSelected ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary/50'}`}
                >
                  {isSelected && (
                    <svg viewBox='0 0 10 8' fill='none' className='w-3 h-3'>
                      <path d='M1 4l2.5 2.5L9 1' stroke='white' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer actions */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100 '>
          <span className='text-xs text-gray-400'>
            {tempSelectedUsers.length} / {allUsers.length} selected
          </span>
          <div className='flex gap-2'>
            <button
              className='card-btn text-sm'
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className='card-btn-fill text-sm flex items-center gap-1.5'
              onClick={handleAssign}
            >
              <UserCheck size={14} />
              Assign
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUsers

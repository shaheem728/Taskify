import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../shared/layouts/DashboardLayout'
import axiosInstance from '../../shared/api/axiosInstance';
import { API_PATHS } from '../../shared/api/apiPaths';
import UserCard from '../../shared/components/cards/UserCard';
import EmptyState from '../../shared/components/ui/EmptyState';
import toast from 'react-hot-toast';
import Loading from '../../shared/components/ui/Loading';
import { FaPlus } from "react-icons/fa6";
import Button from '../../shared/components/ui/Button';
import { createUser } from '../../api/UserApi';
import Modal from '../../shared/components/ui/Modal';
import AuthInput from '../../shared/components/input/AuthInput';
import { deleteUser } from '../../api/UserApi';
import { Trash } from 'lucide-react';
import ConfirmModal from '../../shared/components/ui/ConfirmModal'
import UserTable from "../../shared/components/UserTable";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const emptyFilters = { search: "" };

  // inside your component
  const [draftFilters, setDraftFilters] = useState(emptyFilters);   // what the user is typing
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters); // what is actually used

  const handleApply = () => setAppliedFilters(draftFilters);

  const handleClear = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const hasActiveFilters = appliedFilters.search || appliedFilters.role;

  const filteredUsers = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();
    return allUsers.filter((user) => {
      const matchesSearch =
        !q ||
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q);
      return matchesSearch;
    });
  }, [allUsers, appliedFilters]);


  const handleClose = () => {
    setIsOpen(false);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
  };

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteUser(selectedUser._id)
      setIsDeleteOpen(false);
      toast.success("Member deleted successfully");
      getAllUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting Member")
      console.log("Error deleting Member:", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false)
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createUser(formData);
      toast.success('User created successfully');
      setIsOpen(false);
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      getAllUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.USER.GET_ALL_USER);
      setAllUsers(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.log("Error fetching users:", error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers()
    return () => { }
  }, [])
  return (
    <>
      <DashboardLayout activeMenu="Team Members">
        <div className='mt-5 mb-10'>
          <div className='flex md:flex-row md:items-center justify-between'>
            <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
            <Button
              onClick={() => setIsOpen(true)}
              leftIcon={<FaPlus className="text-lg" />}
            >
              New Member
            </Button>
          </div>

          {/* Filter bar */}
          <div className="mt-4 lg:mx-10  flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-sm text-gray-600">Search</label>
              <input
                type="text"
                value={draftFilters.search}
                onChange={(e) => setDraftFilters({ ...draftFilters, search: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder="Search by name or email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApply}>Apply Filter</Button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!hasActiveFilters && !draftFilters.search}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Filter
              </button>
            </div>
          </div>


          {isLoading ? (
            <Loading />
          ) : allUsers.length > 0 ? (
            <div className='flex flex-wrap gap-4 mt-4'>
              {allUsers.map((user) => (
                <UserCard key={user._id} userInfo={user} />
              ))}
            </div>
          ) : (
            <EmptyState
              className='mt-4 h-[75vh]'
              title='No team members found'
              message='Users will appear here once they are added.'
            />
          )}
        </div>
      </DashboardLayout>

      <Modal isOpen={isOpen} onClose={handleClose} title="Add New Member" maxWidth="md">
        <form onSubmit={handleSubmit} className='space-y-4'>
          {errors.name && <p className='text-xs text-red-500 mb-1'>{errors.name}</p>}
          <AuthInput
            label='Full Name'
            type='text'
            className='bg-white'
            placeholder='Enter full name'
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
          {errors.email && <p className='text-xs text-red-500 mb-1'>{errors.email}</p>}
          <AuthInput
            label='Email Address'
            type='email'
            className='bg-white'
            placeholder='name@company.com'
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
          {errors.password && <p className='text-xs text-red-500 mb-1'>{errors.password}</p>}
          <AuthInput
            label='Password'
            type='password'
            placeholder='••••••••'
            className='bg-white'
            value={formData.password}
            onChange={handleChange('password')}
            required
            minLength={6}
          />
          <div className='flex items-center justify-end gap-3 pt-2'>
            <Button variant='outline' onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type='submit' isLoading={submitting} disabled={submitting}>
              Create User
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ManageUsers

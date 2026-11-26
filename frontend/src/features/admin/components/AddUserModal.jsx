import React from 'react';
import Modal from '@/shared/components/ui/Modal';
import AuthInput from '@/shared/components/form/input/AuthInput';
import Button from '@/shared/components/ui/Button';

const AddUserModal = ({ isOpen, isEdit, onClose, formData, errors, submitting, onChange, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isEdit? 'Update' : 'Add New'} Member`} maxWidth="md">
        <form onSubmit={onSubmit} className='space-y-4'>
            {errors.name && <p className='text-xs text-red-500 mb-1'>{errors.name}</p>}
            <AuthInput
                label='Full Name'
                type='text'
                className='bg-white'
                placeholder='Enter full name'
                value={formData.name}
                onChange={onChange('name')}
                required
            />
            {errors.designation && <p className='text-xs text-red-500 mb-1'>{errors.designation}</p>}
            <AuthInput
                label='Designation'
                type='text'
                className='bg-white'
                placeholder='intern'
                value={formData.designation}
                onChange={onChange('designation')}
                required
            />
            {errors.email && <p className='text-xs text-red-500 mb-1'>{errors.email}</p>}
            <AuthInput
                label='Email Address'
                type='email'
                className='bg-white'
                placeholder='name@company.com'
                value={formData.email}
                onChange={onChange('email')}
                required
            />
            {errors.password && <p className='text-xs text-red-500 mb-1'>{errors.password}</p>}
            <AuthInput
                label='Password'
                type='password'
                placeholder='••••••••'
                className='bg-white'
                value={formData.password}
                onChange={onChange('password')}
                required
                minLength={6}
            />
            <div className='flex items-center justify-end gap-3 pt-2'>
                <Button variant='outline' onClick={onClose} disabled={submitting}>
                    Cancel
                </Button>
                <Button type='submit' isLoading={submitting} disabled={submitting}>
                   {`${isEdit ?'Update':'Create'}`}
                </Button>
            </div>
        </form>
    </Modal>
);

export default AddUserModal;
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUser } from '@/features/admin/api/adminAPI';
import { EMPTY_USER_FORM, validateUserForm } from '@/features/admin/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateUserForm = ({ onCreated } = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_USER_FORM);
    const [errors, setErrors] = useState({});
    const queryClient = useQueryClient();

    const resetForm = () => {
        setFormData(EMPTY_USER_FORM);
        setErrors({});
    };

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        setIsOpen(false);
        resetForm();
    };

    const handleChange = (key) => (e) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
    };

    const createMutation = useMutation({
        mutationFn: () => createUser(formData),

        onSuccess: () => {
            toast.success('User created successfully');
            setIsOpen(false);
            resetForm();
            onCreated?.();
        },

        onError: (error) => {
            const message = error.response?.data?.message;
            console.error('Failed to create user. Please try again:', message || error.message);
            toast.error(message || 'Failed to create user. Please try again.');
        },

        onSettled: () => {
            // Always refetch after error or success to sync with server
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },

    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateUserForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        createMutation.mutate();

    };

    return {
        isOpen,
        formData,
        errors,
        submitting: createMutation.isPending,
        handleOpen,
        handleClose,
        handleChange,
        handleSubmit,
    };
};

export default useCreateUserForm;
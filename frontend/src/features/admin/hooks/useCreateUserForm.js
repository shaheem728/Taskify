
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUser, updateUser } from '@/features/admin/api/adminAPI';
import { EMPTY_USER_FORM, validateUserForm } from '@/features/admin/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateUserForm = ({ onCreated } = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_USER_FORM);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const queryClient = useQueryClient();

    const resetForm = () => {
        setFormData({ ...EMPTY_USER_FORM });
        setErrors({});
        setIsEdit(false);
    };

    const handleOpen = () => {
        resetForm();
        setIsOpen(true);
    };

    const handleUpdate = (user) => {
        setIsEdit(true);

        setFormData({
            id: user._id,
            name: user.name,
            email: user.email,
            designation: user.designation,
            password: ''
        });

        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        resetForm();
    };

    const handleChange = (key) => (e) => {
        const { value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));

        setErrors((prev) =>
            prev[key] ? { ...prev, [key]: '' } : prev
        );
    };

    const userMutation = useMutation({
        mutationFn: (data) =>
            isEdit ? updateUser(data) : createUser(data),

        onSuccess: () => {
            toast.success(
                `User ${isEdit ? 'updated' : 'created'} successfully`
            );

            handleClose();
            onCreated?.();
        },

        onError: (error) => {
            const message = error.response?.data?.message;

            toast.error(
                message || `Failed to ${isEdit ? 'update' : 'create'} user.`
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateUserForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        userMutation.mutate(formData);
    };

    return {
        isOpen,
        formData,
        errors,
        submitting: userMutation.isPending,
        isEdit,
        handleOpen,
        handleClose,
        handleChange,
        handleSubmit,
        handleUpdate,
    };
};

export default useCreateUserForm;

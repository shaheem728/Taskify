
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteUser } from '@/features/admin/api/adminAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteUser = ({ onDeleted } = {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const queryClient = useQueryClient();

    const handleOpen = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const handleClose = () => {
        if (deleteMutation.isPending) return;
        setIsOpen(false);
        setSelectedUser(null);
    };

    const deleteMutation = useMutation({
        mutationFn: () => deleteUser(selectedUser._id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Alluser"],
            });

            setIsOpen(false);
            setSelectedUser(null);

            toast.success('Member deleted successfully');
            onDeleted?.();
        },

        onError: (error) => {
            const message = error.response?.data?.message;

            console.error('Error deleting Member:', message || error.message);
            toast.error(message || 'Error deleting Member');
        },
    });

    const handleConfirm = () => {
        if (!selectedUser || deleteMutation.isPending) return;

        deleteMutation.mutate();
    };

    return {
        isOpen,
        selectedUser,
        isDeleting: deleteMutation.isPending,
        handleOpen,
        handleClose,
        handleConfirm,
    };
};

export default useDeleteUser;

import React from 'react';
import { Trash } from 'lucide-react';
import ConfirmModal from '@/shared/components/ui/ConfirmModal';

const DeleteUserModal = ({ isOpen, onClose, isLoading, onConfirm }) => (
    <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Delete"
        maxWidth="xl"
        confirmButtonVariant="danger"
        confirmIcon={<Trash size={18} />}
        onConfirm={onConfirm}
    />
);

export default DeleteUserModal;
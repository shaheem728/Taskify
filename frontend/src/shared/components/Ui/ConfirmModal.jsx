import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({
  isOpen = false,
  onClose,
  title = 'Confirm',
  message,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmButtonVariant = 'danger',
  confirmIcon,
  isLoading = false,
  onConfirm,
}) => {
  const currentIsLoading = isLoading;

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <p className="text-body text-text-secondary mb-6">{message}</p>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={currentIsLoading}>
          {cancelText}
        </Button>
        <Button
          variant={confirmButtonVariant}
          onClick={handleConfirm}
          leftIcon={confirmIcon}
          isLoading={currentIsLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;


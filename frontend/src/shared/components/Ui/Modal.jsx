import React from 'react';
import { IoClose } from 'react-icons/io5';

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90%]',
};

const Modal = ({
  isOpen,
  onClose,
  title,
  maxWidth = 'md',
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex justify-center items-center  h-screen overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'
    >
      <div className='flex justify-center items-center   w-full  max-h-full'>
        <div
          className={`relative bg-blue-50 w-full shadow-sm rounded-lg ${MAX_WIDTH_CLASSES[maxWidth] || MAX_WIDTH_CLASSES.md} ${className}`}
        >
          {title && (
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200'>
              <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
              <button
                className='text-primary bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer'
                onClick={onClose}
                type='button'
              >
                <IoClose size={20} />
              </button>
            </div>
          )}
          <div className='p-4 md:p-5 space-y-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

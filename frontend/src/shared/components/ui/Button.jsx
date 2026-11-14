import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  default: 'bg-primary text-white shadow-lg shadow-purple-600/5 hover:bg-primary/80',
  outline: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  success: 'bg-emerald-500 text-white hover:bg-emerald-600',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
};

const BASE_STYLES =
  'inline-flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:pointer-events-none';

const Button = ({
  children,
  variant = 'default',
  onClick,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${BASE_STYLES} ${VARIANTS[variant] || VARIANTS.default} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className='w-4 h-4 animate-spin' />
      ) : (
        <>
          {leftIcon && <span className='flex items-center'>{leftIcon}</span>}
          {children}
          {rightIcon && <span className='flex items-center'>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;

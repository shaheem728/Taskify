import React from 'react';
import { LuFileSpreadsheet } from 'react-icons/lu';

const EmptyState = ({
    title = 'No data found',
    message,
    icon,
    action,
    actionLabel,
    onAction,
    size = 'md',
    className,
    ...rest
}) => {
    const sizePadding = {
        sm: 'py-8 gap-2',
        md: 'py-12 gap-3',
        lg: 'py-16 gap-4',
    };

    const defaultIcon = (
        <LuFileSpreadsheet className='text-4xl text-slate-300 mb-3' />
    );

    return (
        <div
            className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center ${sizePadding[size]} ${className || ''}`}
            {...rest}
        >
            {icon || defaultIcon}
            {title && <h3 className='text-base font-medium text-slate-700'>{title}</h3>}
            {message && <p className='text-sm text-slate-500'>{message}</p>}
            {action || (actionLabel && onAction) ? (
                <button
                    type='button'
                    onClick={onAction}
                    className='btn-primary mt-4 flex items-center justify-center gap-2 text-sm font-medium'
                >
                    {action || actionLabel}
                </button>
            ) : null}
        </div>
    );
};

export default EmptyState;


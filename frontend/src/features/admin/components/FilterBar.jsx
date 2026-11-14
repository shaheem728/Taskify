import React from 'react';
import Button from '@/shared/components/ui/Button';

const FilterBar = ({ search, onSearchChange, onApply, onClear, canClear }) => (
    <div className="mt-4 lg:mx-10 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-end">
        <div className="flex-1">
            <label className="mb-1 block text-sm text-gray-600">Search</label>
            <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApply()}
                placeholder="Search by name or email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
        </div>

        <div className="flex gap-2">
            <Button onClick={onApply}>Apply Filter</Button>
            <button
                type="button"
                onClick={onClear}
                disabled={!canClear}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Clear Filter
            </button>
        </div>
    </div>
);

export default FilterBar;
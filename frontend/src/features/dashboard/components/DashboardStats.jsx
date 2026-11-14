import React from 'react';
import InfoCard from '@/shared/components/cards/InfoCard';
import { addThousandsSeparator } from '@/shared/utils/helper';

const DashboardStats = ({ taskDistribution = {} }) => {
    const stats = [
        { label: 'Total Tasks', value: taskDistribution.All, color: 'bg-primary' },
        { label: 'Pending Tasks', value: taskDistribution.Pending, color: 'bg-violet-500' },
        { label: 'In Progress Tasks', value: taskDistribution.InProgress, color: 'bg-cyan-500' },
        { label: 'Completed Tasks', value: taskDistribution.Completed, color: 'bg-lime-500' },
    ];

    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
            {stats.map(({ label, value, color }) => (
                <InfoCard
                    key={label}
                    label={label}
                    value={addThousandsSeparator(value || 0)}
                    color={color}
                />
            ))}
        </div>
    );
};

export default DashboardStats;
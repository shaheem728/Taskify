import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TaskLisTable from '@/features/dashboard/components/task/TaskLisTable';
import CustomPieChart from '@/features/dashboard/components/charts/CustomPieChart';
import CustomBarChart from '@/features/dashboard/components/charts/CustomBarChart';
import Loading from '@/shared/components/ui/Loading';
import EmptyState from '@/shared/components/ui/EmptyState';
import DashboardStats from './DashboardStats';
import { DASHBOARD_COLORS } from '@/features/dashboard/utils/dashboard.utils';

/**
 * The shared dashboard layout.
 * - hero: role-specific banner (slot)
 * - dashboard: the object returned by useDashboard()
 * - onSeeMore: role-specific navigation
 */
const DashboardView = ({ hero, dashboard, onSeeMore }) => {
    const {
        isLoading,
        taskDistribution,
        pieChartData,
        barChartData,
        hasDistributionData,
        hasPriorityData,
        recentTasks,
    } = dashboard;

    return (
        <>
            <div className='card my-5'>
                {hero}
                <DashboardStats taskDistribution={taskDistribution} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
                <div className='card'>
                    <h5 className='font-medium'>Task Distribution</h5>
                    {isLoading ? <Loading /> : hasDistributionData ? (
                        <CustomPieChart data={pieChartData} colors={DASHBOARD_COLORS} />
                    ) : (
                        <EmptyState
                            title='No task distribution found'
                            message='Assigned tasks will appear here by status.'
                        />
                    )}
                </div>

                <div className='card'>
                    <h5 className='font-medium'>Task Priority Levels</h5>
                    {isLoading ? <Loading /> : hasPriorityData ? (
                        <CustomBarChart data={barChartData} colors={DASHBOARD_COLORS} />
                    ) : (
                        <EmptyState
                            title='No task priority data found'
                            message='Assigned tasks will appear here by priority.'
                        />
                    )}
                </div>

                <div className='md:col-span-2 card'>
                    <div className='flex items-center justify-between'>
                        <h5 className='text-lg'>Recent Tasks</h5>
                        <button className='card-btn' onClick={onSeeMore}>
                            See All<LuArrowRight className='text-base' />
                        </button>
                    </div>
                    {isLoading ? <Loading /> : recentTasks.length > 0 ? (
                        <TaskLisTable tableData={recentTasks} />
                    ) : (
                        <EmptyState
                            title='No recent tasks found'
                            message='Your recently assigned tasks will appear here.'
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardView;
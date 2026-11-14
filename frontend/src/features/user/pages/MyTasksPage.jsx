import React from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '@/shared/components/task/TaskStatusTabs';
import TaskCard from '@/shared/components/cards/TaskCard';
import Loading from '@/shared/components/ui/Loading';
import useMyTasks from '@/features/user/hooks/useMyTasks';

const MyTasksPage = () => {
  const {
    allTasks,
    tabs,
    filterStatus,
    setFilterStatus,
    isLoading,
    handleView,
  } = useMyTasks();

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
          <h2 className='text-xl font-medium'>My Task</h2>
          {tabs?.[0]?.count > 0 && (
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>

        {isLoading ? (
          <Loading />
        ) : allTasks.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
            {allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || {}}
                onClick={() => handleView(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 mt-4 text-center'>
            <LuFileSpreadsheet className='text-4xl text-slate-300 mb-3' />
            <h3 className='text-base font-medium text-slate-700'>No tasks found</h3>
            <p className='text-sm text-slate-500 mt-1'>
              {filterStatus === 'All'
                ? 'You do not have any assigned tasks yet.'
                : `No ${filterStatus.toLowerCase()} tasks to display.`}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTasksPage;
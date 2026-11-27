import React from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '@/shared/components/task/TaskStatusTabs';
import TaskCard from '@/shared/components/cards/TaskCard';
import Loading from '@/shared/components/ui/Loading';
import useMyTasks from '@/features/user/hooks/useMyTasks';
import {  FileCheck } from 'lucide-react';

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
      <div className='m-5'>
              <div className="flex items-center gap-2.5 mb-8">
                <div className="p-2 rounded-lg bg-primary  text-white">
                  <FileCheck className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                   My Task
                  </h2>
                  <p className="lg:text-sm text-xs text-slate-700">
                   Manage assigned tasks and keep their statuses up to date.
                  </p>
                </div>
              </div>
        {/* <div className='flex my-2'> */}
          {tabs?.[0]?.count > 0 && (
            <div className='flex justify-center  lg:items-start items-center lg:gap-3 gap-1  my-3 shadow bg-white rounded-lg w-fit px-1'>
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>)}
        {/* </div> */}

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
                assignedTo={item.assignedTo?.length || 0}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || {}}
                onClick={() => handleView(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center  py-16 mt-4 text-center'>
            <LuFileSpreadsheet className='text-4xl text-slate-400 mb-3' />
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
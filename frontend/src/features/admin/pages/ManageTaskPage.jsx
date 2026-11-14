import React from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { FaPlus } from 'react-icons/fa6';
import TaskStatusTabs from '@/shared/components/task/TaskStatusTabs';
import TaskCard from '@/shared/components/cards/TaskCard';
import Loading from '@/shared/components/ui/Loading';
import EmptyState from '@/shared/components/ui/EmptyState';
import { ListChecks } from 'lucide-react';
import Button from '@/shared/components/ui/Button';
import useManageTasks from '@/features/admin/hooks/useManageTasks';

const ManageTaskPage = () => {
  const {
    allTasks,
    tabs,
    filterStatus,
    setFilterStatus,
    isLoading,
    handleCreate,
    handleEdit,
    handleView,
  } = useManageTasks();

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
          <div className='flex items-center justify-between gap-3 w-full'>
            <h2 className='text-xl font-medium'>My Task</h2>

            <Button
              onClick={handleCreate}
              leftIcon={<FaPlus className="text-lg" />}
            >
              New Task
            </Button>
          </div>
        </div>

        {tabs?.[0]?.count > 0 && (
          <div className='flex items-center gap-3 my-3'>
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}

        {isLoading ? (
          <Loading />
        ) : allTasks.length > 0 ? (
          <div className='flex flex-wrap gap-4 mt-4'>
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
                updatedAt={item.updatedAt}
                assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || {}}
                onClick={() => handleEdit(item)}
                onView={() => handleView(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            className='mt-4 h-[75vh]'
            title='No tasks found'
            message='Create a new task to get started.'
            icon={<ListChecks className='text-4xl text-slate-500 mb-3' />}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTaskPage;
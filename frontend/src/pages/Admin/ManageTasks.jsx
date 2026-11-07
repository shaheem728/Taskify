import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../shared/api/axiosInstance';
import { API_PATHS } from '../../shared/api/apiPaths';
import DashboardLayout from '../../shared/layouts/DashboardLayout';
import { FaPlus } from "react-icons/fa6";
import TaskStatusTabs from '../../shared/components/task/TaskStatusTabs';
import TaskCard from '../../shared/components/cards/TaskCard';
import Loading from '../../shared/components/ui/Loading';
import EmptyState from '../../shared/components/ui/EmptyState';
import { ListChecks } from 'lucide-react';
import Button from '../../shared/components/ui/Button';

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus
        }
      });
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);
      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },

      ]
      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } })
  }

  const handleView = (taskData) => {
    navigate(`/admin/view-task/${taskData._id}`)
  }

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => { };
  }, [filterStatus])
  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between  '>
          <div className='flex items-center justify-between gap-3 w-full'>
            <h2 className='text-xl font-medium'>My Task</h2>

            <Button
              onClick={() => navigate('/admin/create-task')}
              leftIcon={<FaPlus className="text-lg" />}
            >
              New Task
            </Button>
          </div>
        </div>

        {
          tabs?.[0]?.count > 0 && (
            <div className='flex items-center gap-3 my-3'>
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
            </div>
          )
        }

        {isLoading ? (
          <Loading />
        ) : allTasks.length > 0 ? (
          <div className='flex flex-wrap  gap-4 mt-4'>
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
                assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || {}}
                onClick={() => {
                  handleClick(item);
                }}
                onView={() => {
                  handleView(item)
                }}
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
  )
}

export default ManageTasks

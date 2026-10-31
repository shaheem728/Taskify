import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { FaPlus } from "react-icons/fa6";
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
import Loading from '../../components/Loading';
import EmptyState from '../../components/Ui/EmptyState';
import { ListChecks } from 'lucide-react';

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

  // download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORT.EXPORT_TASK, {
        responseType: "blob"
      });
      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Task_details.xlsx")
      document.body.appendChild(link)
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error downloading expense details:", error)
      toast.error("Failed to download expense details.Please try again.")
    }
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

            <button
              className='btn-primary flex items-center w-30!'
              onClick={() => navigate('/admin/create-task')}>
              <FaPlus className="text-lg mx-2" />
              New Task
            </button>
          </div>

          {
            tabs?.[0]?.count > 0 && (
              <div className='flex items-center gap-3'>
                <TaskStatusTabs
                  tabs={tabs}
                  activeTab={filterStatus}
                  setActiveTab={setFilterStatus}
                />
                <button className='hidden lg:flex download-btn' onClick={handleDownloadReport}>
                  <LuFileSpreadsheet className='text-lg' />
                  Download Report
                </button>
              </div>
            )
          }
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
                updatedAt={item.updatedAt}
                assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || {}}
                onClick={() => {
                  handleClick(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            className='mt-4'
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

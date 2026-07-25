import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';

const MyTasks = () => {
  const [allTasks,setAllTasks] = useState([]);
  const [tabs,setTabs] =useState([]);
  const [filterStatus,setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async()=>{
     try{
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,{
        params:{
          status:filterStatus === "All" ? "" : filterStatus
        }
      });
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);
      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count:statusSummary.all || 0},
        { label:"Pending", count:statusSummary.pendingTasks || 0},
        { label:"In Progress", count:statusSummary.inProgressTasks || 0},
        { label:"Completed", count:statusSummary.completedTasks || 0},

      ]
      setTabs(statusArray);
     }catch(error){
      console.error("Error fetching users",error);
     }
  }

  const handleClick = (taskId) =>{
    navigate(`/user/task-details/${taskId}`)
  }

  useEffect(()=>{
    getAllTasks(filterStatus);
    return ()=>{};
  },[filterStatus])
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='my-5'>
       <div className='flex flex-col lg:flex-row lg:items-center justify-between  '>
          <h2 className='text-xl font-medium'>My Task</h2>
        {
          tabs?.[0]?.count > 0 && (
              <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
              />
          )
        }
       </div>

       {allTasks.length > 0 ? (
         <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {allTasks.map((item)=>(
            <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={item.assignedTo?.map((item)=>item.profileImageUrl)}
            attachmentCount={item.attachments?.length || 0}
            completedTodoCount={item.completedTodoCount || 0}
            todoChecklist ={item.todoChecklist || {}}
            onClick={()=>{
              handleClick(item._id);
            }}
            />
          ))}
         </div>
       ) : (
         <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 mt-4 text-center'>
           <LuFileSpreadsheet className='text-4xl text-slate-300 mb-3' />
           <h3 className='text-base font-medium text-slate-700'>No tasks found</h3>
           <p className='text-sm text-slate-500 mt-1'>
             {filterStatus === 'All' ? 'You do not have any assigned tasks yet.' : `No ${filterStatus.toLowerCase()} tasks to display.`}
           </p>
         </div>
       )}
      </div>
    </DashboardLayout>
  )
}

export default MyTasks

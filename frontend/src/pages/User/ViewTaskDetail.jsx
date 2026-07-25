import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import AssignedUserList from '../../components/AssignedUserList';
import { LuSquareArrowOutUpRight, LuArrowLeft, } from 'react-icons/lu';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {useNavigate} from 'react-router-dom'
import {TodoCheckList} from './TodoCheckList'

const ViewTaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
   const navigate = useNavigate();
  const getStatusTagColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border  border-cyan-500/10';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/20';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  }
  //get Task Info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching task", error)
    }
  };

  //handle todo check
  const updateTodoStatus = async (todoId, status) => {
    const todoChecklist = task.todoChecklist.map((item) =>
      item._id === todoId ? { ...item, status } : item
    );
    const previousTask = task;

    setTask({ ...task, todoChecklist });

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist }
      );
      setTask(response.data?.task || previousTask);
    } catch (error) {
      setTask(previousTask);
      console.error('Error updating todo status', error);
    }
  };


  //handle attachment link click
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link; //Default to Http
    }
    window.open(link, "_blank");
  }

  useEffect(() => {
    if (id) {
      getTaskDetailsByID(id)
    }
    return () => { };
  }, [id])

  
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='mt-5'>
        {task && (
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card col-span-3'>
              <div className='flex item-center justify-between'>
                <h2 className='text-sm md:text-xl font-medium'>
                  {task?.title}
                </h2>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    className='flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-200 cursor-pointer'
                    onClick={() => navigate('/user/tasks')}>
                    <LuArrowLeft className='text-base' /> Back
                  </button>
                  <div className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
                    {task?.status}
                  </div>
                </div>
              </div>


              <div className='mt-4'>
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className='grid grid-cols-12 gap-4 mt-4'>
                <div className='col-span-6 md:col-span-3'>
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className='col-span-6 md:col-span-3'>
                  <InfoBox label="Due Date" value={task?.dueDate ? moment(task?.dueDate).format("Do MMM YYYY") : "N/A"} />
                </div>

                <div className='col-span-6 md:col-span-3'>
                  <InfoBox label="Updated Date" value={task?.updatedAt ? moment(task?.updatedAt).format("Do MMM YYYY") : "N/A"} />
                </div>

                <div className='col-span-6 md:col-span-3 '>
                  <label className='text-xs font-medium text-slate-500'>
                    Assigned To
                  </label>
                  <AssignedUserList users={task?.assignedTo || []} />
                </div>
              </div>

                  {
                task?.attachments?.length > 0 && (
                  <div className='mt-2'>
                    <label className='text-xs font-medium text-slate-500'>Attachments</label>
                    {
                      task?.attachments?.map((link, index) => (
                        <Attachments key={`link_${index}`} link={link} index={index}
                          onClick={() => handleLinkClick(link)} />
                      ))
                    }
                  </div>
                )}

              <div className='mt-2'>
                <label className='text-xs font-medium text-slate-500'>Todo Checklist</label>
                <TodoCheckList
                  items={task?.todoChecklist || []}
                  onDrop={updateTodoStatus}
                />
              </div>

          
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}




const InfoBox = ({ value, label }) => {
  return <>
    <label className='text-xs font-medium text-slate-500'>{label}</label>
    <p className='text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5'>{value}</p>
  </>
}

// const TodoCheckList = ({ text, isChecked, onChange }) => {
//   return <div className='flex items-center gap-3 p-3'>
//     <input
//       type='checkbox'
//       checked={isChecked}
//       onChange={onChange}
//       className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer'
//     />
//     <p className='text-[13px] text-gray-800'>{text}</p>
//   </div>
// }

const Attachments = ({ link, index, onClick }) => {
  return <div className='flex justify-between bg-blue-100 px-3 py-2 rounded-md mt-2 mb-3 cursor-pointer'
    onClick={onClick}>
    <div className='flex'>
      <span className='text-xs text-gray-400 font-semibold mr-2'>
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <p className='text-xs text-black'>{link}</p>
    </div>
    <LuSquareArrowOutUpRight className='text-gray-400 hover:text-blue-500' />
  </div>
}

export default ViewTaskDetail

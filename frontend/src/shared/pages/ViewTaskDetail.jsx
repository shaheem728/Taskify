import { useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import axiosInstance from '../../shared/api/axiosInstance';
import { API_PATHS } from '../../shared/api/apiPaths';
import moment from 'moment';
import AssignedUserList from '../components/profile/AssignedUserList';
import { LuSquareArrowOutUpRight, LuArrowLeft, } from 'react-icons/lu';
import DashboardLayout from '../../shared/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom'
import { TodoCheckList } from '../components/todo/TodoCheckList'
import { UserContext } from '../context/useContext'
import toast from "react-hot-toast";


const ViewTaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { user } = useContext(UserContext)
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
      item._id === todoId ? { ...item, status, updateBy: user.user } : item
    );
    const previousTask = task;

    setTask({ ...task, todoChecklist });

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist }
      );
      setTask(response.data?.task || previousTask);
      toast.success("Todo updated successfully");
    } catch (error) {
      setTask(previousTask);
      console.error('Error updating todo status', error);
      toast.error("Todo updated failed");
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
    <DashboardLayout activeMenu={user?.role === "admin" ? "Manage Tasks" : " My Tasks"}>
      <div className='mt-5'>
        {task && (
          <div className='flex flex-wrap mt-4'>
            <div className='form-card'>
              <div className='flex  item-center justify-between'>
                <h2 className='text-sm md:text-xl font-medium'>
                  {task?.title}
                </h2>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    className='flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-200 cursor-pointer'
                    onClick={() => navigate(-1)}>
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

              <div className='flex justify-around gap-4 mt-4'>
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

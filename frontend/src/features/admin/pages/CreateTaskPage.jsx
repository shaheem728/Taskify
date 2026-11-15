import React from 'react';
import { useLocation } from 'react-router-dom';
import { Trash } from 'lucide-react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import { PRIORITY_DATA } from '@/shared/utils/data';
import { LuArrowLeft, LuTrash } from 'react-icons/lu';
import SelectDropdown from '@/shared/components/form/select/SelectDropdown';
import SelectUsers from '@/shared/components/form/select/SelectUsers';
import TodoListInput from '@/shared/components/form/input/TodoListInput';
import AttachmentsInput from '@/shared/components/form/input/AttachmentsInput';
import ConfirmModal from '@/shared/components/ui/ConfirmModal';
import useTaskForm from '@/features/admin/hooks/useTaskForm';
import Loading from '@/shared/components/ui/Loading';

const CreateTaskPage = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const {
    taskData,
    error,
    loading,
    isLoading,
    openDeleteAlert,
    setOpenDeleteAlert,
    handleValueChange,
    handleSubmit,
    handleDelete,
    handleCancel,
    handleBack,
  } = useTaskForm({ taskId });

  if (isLoading) return <Loading />



  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className='mt-5 w-screen'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    className='flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-200 cursor-pointer'
                    onClick={handleBack}>
                    <LuArrowLeft className='text-base' /> Back
                  </button>
                  <button
                    type='button'
                    className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 md:border-rose-300 cursor-pointer'
                    onClick={() => setOpenDeleteAlert(true)}>
                    <LuTrash className='text-base' />Delete
                  </button>
                </div>
              )}
            </div>

            <div className='mt-4 flex items-center'>
              <label className='text-sm w-30 font-medium text-slate-600'>Task Title</label>
              <input
                placeholder='Create App UI'
                className='form-input'
                value={taskData.title}
                onChange={({ target }) => handleValueChange('title', target.value)}
              />
            </div>

            <div className='mt-3 flex items-center'>
              <label className='text-sm w-30 font-medium text-slate-600'>Description</label>
              <textarea
                placeholder='Describe Task'
                className='form-input'
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange('description', target.value)}
              />
            </div>

            <div className='mt-4 flex items-center'>
              <label className='text-sm w-28 font-medium text-slate-600'>Priority</label>
              <div className='w-35'>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange('priority', value)}
                  placeholder='Select Priorty'
                />
              </div>
            </div>

            <div className='mt-4 flex items-center'>
              <label className='text-sm w-28 font-medium text-slate-600'>Due Data</label>
              <input
                className='form-input w-35!'
                value={taskData.dueDate || ''}
                onChange={({ target }) => handleValueChange('dueDate', target.value)}
                type='date'
              />
            </div>

            <div className='mt-4 flex '>
              <label className='text-sm w-28 font-medium text-slate-600'>Assign To</label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) => handleValueChange('assignedTo', value)}
              />
            </div>

            <div className='mt-4 flex items-center'>
              <label className='text-sm w-32 font-medium text-slate-600'>ToDo Checklist</label>
              <div className='w-full'>
                <TodoListInput
                  todoList={taskData.todoChecklist}
                  setTodoList={(value) => handleValueChange('todoChecklist', value)}
                />
              </div>

            </div>

            <div className='mt-4 flex items-center'>
              <label className='text-sm w-32  font-medium text-slate-600 mt-2'>Add Attachments (optional) </label>
              <div className='w-full'>
                <AttachmentsInput
                  attachments={taskData.attachments}
                  setAttachments={(value) => handleValueChange('attachments', value)}
                />
              </div>
            </div>

            {error && (
              <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
            )}

            <div className='flex justify-end mt-7 gap-2'>
              <button className='cancel-btn' onClick={handleCancel} disabled={loading}>
                CANCEL
              </button>
              <button className='add-btn' onClick={handleSubmit} disabled={loading}>
                {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        isLoading={isLoading}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Delete"
        maxWidth="xl"
        confirmButtonVariant="danger"
        confirmIcon={<Trash size={18} />}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
};

export default CreateTaskPage;
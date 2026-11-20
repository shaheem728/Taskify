import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIORITY_DATA } from '@/shared/utils/data';
import { LuArrowLeft } from 'react-icons/lu';

import DashboardLayout from '@/shared/layouts/DashboardLayout';
import SelectDropdown from '@/shared/components/form/select/SelectDropdown';
import SelectUsers from '@/shared/components/form/select/SelectUsers';
import TodoListInput from '@/shared/components/form/input/TodoListInput';
import AttachmentsInput from '@/shared/components/form/input/AttachmentsInput';
import useTaskForm from '@/features/admin/hooks/useTaskForm';
import Loading from '@/shared/components/ui/Loading';

const CreateTaskPage = () => {
  const location = useLocation();
  const { taskId } = location.state || {};

  const {
    taskData,
    error,
    isLoading,
    handleValueChange,
    handleSubmit,
    handleCancel,
    handleBack,
  } = useTaskForm({ taskId });

  if (isLoading) return <Loading />;

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="w-full px-3 sm:px-5 lg:px-6 py-4 ">
        <div className="grid grid-cols-1">
          <div className="form-card w-full min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-medium">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>

              {taskId && (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[13px] font-medium text-muted bg-slate-50 rounded px-3 py-2 border border-slate-200"
                    onClick={handleBack}
                  >
                    <LuArrowLeft className="text-base" />
                    Back
                  </button>
              )}
            </div>

            {/* Task Title */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0">
                Task Title
              </label>
              <input
                placeholder="Create App UI"
                className="form-input w-full min-w-0"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange('title', target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0 sm:pt-2">
                Description
              </label>
              <textarea
                placeholder="Describe Task"
                className="form-input w-full min-w-0"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange('description', target.value)
                }
              />
            </div>

            {/* Priority */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0">
                Priority
              </label>
              <div className="w-full sm:w-48">
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) =>
                    handleValueChange('priority', value ?? '')
                  }
                  placeholder="Select Priority"
                />
              </div>
            </div>

            {/* Due Date */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="text-sm font-medium text-muted sm:w-32 shrink-0">
            Due Date
          </label>
          <input
            className="form-input w-full lg:w-48!"
            value={taskData.dueDate || ''}
            min={new Date().toISOString().split('T')[0]}
            onChange={({ target }) =>
              handleValueChange('dueDate', target.value)
            }
            type="date"
          />
        </div>

            {/* Assign To */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0 sm:pt-2">
                Assign To
              </label>
              <div className="w-full min-w-0">
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange('assignedTo', value)
                  }
                />
              </div>
            </div>

            {/* Todo Checklist */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0 sm:pt-2 mt-2">
                ToDo Checklist
              </label>
              <div className="w-full min-w-0">
                <TodoListInput
                  todoList={taskData.todoChecklist}
                  setTodoList={(value) =>
                    handleValueChange('todoChecklist', value)
                  }
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <label className="text-sm font-medium text-muted sm:w-32 shrink-0 sm:pt-2">
                Add Attachments (optional)
              </label>
              <div className="w-full min-w-0">
                <AttachmentsInput
                  attachments={taskData.attachments}
                  setAttachments={(value) =>
                    handleValueChange('attachments', value)
                  }
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-row justify-end mt-7 gap-3">
              <button
                className="cancel-btn w-full sm:w-auto"
                onClick={handleCancel}
                disabled={isLoading}
              >
                CANCEL
              </button>

              <button
                className="add-btn w-full sm:w-auto"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
              </button>
            </div>

          </div>
        </div>
      </div>

  
    </DashboardLayout>
  );
};

export default CreateTaskPage;

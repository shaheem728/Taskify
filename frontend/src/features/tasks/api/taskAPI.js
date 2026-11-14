import axiosInstance from '@/shared/api/axios';

/** GET a single task by id. */
export const getTaskById = async (taskId) => {
    const { data } = await axiosInstance.get(`/api/tasks/${taskId}`);
    return data ?? null;
};

/** PUT the whole todo checklist. Resolves with the updated task (or null). */
export const updateTaskTodoChecklist = async (taskId, todoChecklist) => {
    const { data } = await axiosInstance.put(`/api/tasks/${taskId}/todo`, {
        todoChecklist,
    });
    return data?.task ?? null;
};
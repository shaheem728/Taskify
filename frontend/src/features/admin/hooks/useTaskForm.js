import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createTask,
    fetchTaskById,
    updateTask,
} from '@/features/admin/api/adminAPI';
import {
    INITIAL_TASK_DATA,
    buildTaskPayload,
    mapTaskToFormData,
    validateTaskData,
} from '@/shared/utils/task.utils';

const useTaskForm = ({ taskId }) => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState(INITIAL_TASK_DATA);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient()

    const handleValueChange = useCallback((key, value) => {
        setTaskData((prev) => ({ ...prev, [key]: value }));
    }, []);

    // Load existing task when editing
    const { data: currentTask, isLoading } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => fetchTaskById(taskId),
        enabled: Boolean(taskId),
    })

    useEffect(() => {
        if (currentTask) {
            setTaskData(mapTaskToFormData(currentTask));
        }
    }, [currentTask]);

    // Create New Task || Update Exist Task
    const saveTaskMutation = useMutation({
        mutationFn: ({ taskId, payload }) => {
            return taskId
                ? updateTask(taskId, payload)
                : createTask(payload);
        },

        onSuccess: (_, variables) => {
            if (variables.taskId) {
                toast.success("Task Updated Successfully");
            } else {
                toast.success("Task Created Successfully");
                setTaskData(INITIAL_TASK_DATA);
            }

            queryClient.invalidateQueries({
                queryKey: ["task"],
            });

            navigate(-1);
        },

        onError: (err) => {
            console.error("Error saving task:", err);
            toast.error("Failed to save task");
        },
    });

    // Save Task
    const handleSubmit = () => {
        const validationError = validateTaskData(taskData);

        setError(validationError || "");

        if (validationError) return;

        const payload = buildTaskPayload(taskData, currentTask);

        saveTaskMutation.mutate({
            taskId,
            payload,
        });
    };


    const handleCancel = useCallback(() => navigate(-1), [navigate]);
    const handleBack = useCallback(() => navigate('/admin/tasks'), [navigate]);

    return {
        taskData,
        error,
        loading,
        isLoading,
        handleValueChange,
        handleSubmit,
        handleCancel,
        handleBack,
    };
};

export default useTaskForm;
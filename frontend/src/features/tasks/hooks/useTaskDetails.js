import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskTodoChecklist } from '@/features/tasks/api/taskAPI';

export const useTaskDetail = (taskId, currentUser) => {

    const queryClient = useQueryClient();

    const { data: task, isLoading } = useQuery({
        queryKey: ['taskDetail', taskId],
        queryFn: () => getTaskById(taskId),
        enabled: Boolean(taskId),
    });

    const { mutate } = useMutation({
        mutationFn: (todoChecklist) => updateTaskTodoChecklist(taskId, todoChecklist),
        onMutate: async (todoChecklist) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['taskDetail', taskId] });

            // Snapshot the previous value for rollback
            const previousTask = queryClient.getQueryData(['taskDetail', taskId]);

            // Optimistically update the cache
            queryClient.setQueryData(['taskDetail', taskId], (old) => ({
                ...old,
                todoChecklist,
            }));

            return { previousTask };
        },
        onError: (error, _todoChecklist, context) => {
            // Rollback to the previous value on error
            queryClient.setQueryData(['taskDetail', taskId], context.previousTask);
            console.error('Error updating todo status', error);
            toast.error('Failed to update todo');
        },
        onSuccess: () => {
            toast.success('Todo updated successfully');
        },
        onSettled: () => {
            // Always refetch after error or success to sync with server
            queryClient.invalidateQueries({ queryKey: ['taskDetail', taskId] });
        },
    });

    const updateTodoStatus = (todoId, status) => {
        if (!task) return;

        const todoChecklist = task.todoChecklist.map((item) =>
            item._id === todoId ? { ...item, status, updateBy: currentUser } : item
        );

        mutate(todoChecklist);
    };

    return { task, isLoading, updateTodoStatus };
};
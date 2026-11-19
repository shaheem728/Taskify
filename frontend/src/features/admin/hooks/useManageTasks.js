import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllTasks, deleteTask } from '@/features/admin/api/adminAPI';
import { buildStatusTabs } from '@/shared/utils/task.utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useManageTasks = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
   const queryClient = useQueryClient()
    const [onDelete, setOnDelete] = useState(
      {
        id:null,
        isOpen:false
      }
    );

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", filterStatus],
    queryFn: () => fetchAllTasks(filterStatus),
    select: (response) => ({
      tasks: response?.tasks?.length > 0 ? response.tasks : [],
      tabs: buildStatusTabs(response?.statusSummary),
    }),
    onError: (err) => {
      console.error("Error fetching tasks:", err);
    },
  });

  const allTasks = data?.tasks ?? [];
  const tabs = data?.tabs ?? [];

  const handleCreate = useCallback(() => navigate('/admin/create-task'), [navigate]);

  const handleEdit = useCallback(
    (task) => navigate('/admin/create-task', { state: { taskId: task._id } }),
    [navigate]
  );

      // Delete Task By Id
    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(onDelete.id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            toast.success("Task deleted successfully");
            setOnDelete({
              id:null,
              isOpen:false,
            });
        },

        onError: (error) => {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task");
        },
    });

    const handleDelete = () => {
      if (onDelete.id === null || deleteMutation.isPending) return;

      deleteMutation.mutate();
    };

  const handleView = useCallback(
    (task) => navigate(`/admin/view-task/${task._id}`),
    [navigate]
  );

  return {
    allTasks,
    tabs,
    filterStatus,
    setFilterStatus,
    onDelete,
    setOnDelete,
    isLoading,
    handleCreate,
    handleEdit,
    handleDelete,
    handleView,
  };
};

export default useManageTasks;
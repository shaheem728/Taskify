import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllTasks } from '@/features/admin/api/adminAPI';
import { buildStatusTabs } from '@/shared/utils/task.utils';
import { useQuery } from '@tanstack/react-query';

const useManageTasks = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');

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

  const handleView = useCallback(
    (task) => navigate(`/admin/view-task/${task._id}`),
    [navigate]
  );

  return {
    allTasks,
    tabs,
    filterStatus,
    setFilterStatus,
    isLoading,
    handleCreate,
    handleEdit,
    handleView,
  };
};

export default useManageTasks;
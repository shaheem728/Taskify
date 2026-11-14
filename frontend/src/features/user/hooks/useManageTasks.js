import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskList from './useTaskList';

// Admin: list + create / edit / view navigation
const useManageTasks = () => {
    const navigate = useNavigate();
    const list = useTaskList();

    const handleCreate = useCallback(() => navigate('/admin/create-task'), [navigate]);

    const handleEdit = useCallback(
        (task) => navigate('/admin/create-task', { state: { taskId: task._id } }),
        [navigate]
    );

    const handleView = useCallback(
        (task) => navigate(`/admin/view-task/${task._id}`),
        [navigate]
    );

    return { ...list, handleCreate, handleEdit, handleView };
};

export default useManageTasks;
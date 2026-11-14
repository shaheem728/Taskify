import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskList from './useTaskList';

// Member: list + open task details
const useMyTasks = () => {
    const navigate = useNavigate();
    const list = useTaskList();

    const handleView = useCallback(
        (taskId) => navigate(`/user/task-details/${taskId}`),
        [navigate]
    );

    return { ...list, handleView };
};

export default useMyTasks;
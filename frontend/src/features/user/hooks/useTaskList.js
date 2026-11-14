import { useState } from 'react';
import { fetchAllTasks } from '@/features/user/api/userAPI';
import { buildStatusTabs } from '@/shared/utils/task.utils';
import { useQuery } from '@tanstack/react-query'

// Shared list logic: fetch tasks by status filter + build status tabs
const useTaskList = () => {
    const [filterStatus, setFilterStatus] = useState('All');

    const { data, isLoading } = useQuery({
        queryKey: ["mytask", filterStatus],
        queryFn: () => fetchAllTasks(filterStatus)
    })
    const allTasks = data?.tasks ?? [];
    const tabs = buildStatusTabs(data?.statusSummary);

    return { allTasks, tabs, filterStatus, setFilterStatus, isLoading };
};

export default useTaskList;
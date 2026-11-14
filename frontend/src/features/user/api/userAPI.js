import axiosInstance from "@/shared/api/axios";


export const fetchAllTasks = async (status) => {
    const { data } = await axiosInstance.get('/api/tasks', {
        params: { status: status === 'All' ? '' : status },
    });
    return data;
};
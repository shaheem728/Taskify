import axiosInstance from '@/shared/api/axios';

export const fetchUserDashboard = async () => {
    const { data } = await axiosInstance.get(`/api/tasks/user-dashboard-data`);
    return data
}

export const fetchAdminDashboard = async () => {
    const { data } = await axiosInstance.get(`/api/tasks/dashboard-data`);
    return data
}
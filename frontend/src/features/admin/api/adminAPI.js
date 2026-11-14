import axiosInstance from '@/shared/api/axios'


// get All users
export const fetchAllUsers = async () => {
    const { data } = await axiosInstance.get(`/api/users/`)
    return data
}
// Creates a new user (Admin only)
export const createUser = async (userData) => {
    const response = await axiosInstance.post(`/api/users/create`, userData)
    return response
}

// Delete a user (Admin only)
export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`/api/users/${userId}`)
    return response
}

export const fetchTaskReport = () =>
    axiosInstance.get(`/api/reports/export/tasks`, { responseType: 'blob' });

export const fetchUserReport = () =>
    axiosInstance.get(`/api/reports/export/users`, { responseType: 'blob' });

export const fetchAllTasks = async (status = '') => {
    const { data } = await axiosInstance.get('/api/tasks', {
        params: { status: status === 'All' ? '' : status },
    });
    return data
}
export const fetchTaskById = async (taskId) => {
    const { data } = await axiosInstance.get(`/api/tasks/${taskId}`);
    return data
}

export const createTask = async (payload) => {
    const { data } = await axiosInstance.post('/api/tasks', payload);
    return data
}

export const updateTask = async (taskId, payload) => {
    const { data } = await axiosInstance.put(`/api/tasks/${taskId}`, payload);
    return data
}

export const deleteTask = async (taskId) => {
    const { data } = await axiosInstance.delete(`/api/tasks/${taskId}`);
    return data
}


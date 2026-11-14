import axiosInstance from '@/shared/api/axios'

export const loginUser = (userData) => {
    return axiosInstance.post(`/api/auth/login`, userData)
};

export const registerUser = (userData) => {
    return axiosInstance.post(`/api/auth/register`, userData)
};

export const verifyEmail = (userData) => {
    return axiosInstance.post('/api/auth/verify-email', userData)
}

export const verifyResetOtp = (userData) => {
    return axiosInstance.post('/api/auth/verify-reset-otp', userData)
}

export const resetPassword = (userData) => {
    return axiosInstance.post('/api/auth/reset-password', userData)
}



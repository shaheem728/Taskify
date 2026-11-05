import axiosInstance from '../shared/api/axiosInstance'
import { API_PATHS } from '../shared/api/apiPaths'

// Creates a new user (Admin only)
export const createUser = (userData) => {
  return axiosInstance.post(API_PATHS.USER.CREAT_USER, userData)
}


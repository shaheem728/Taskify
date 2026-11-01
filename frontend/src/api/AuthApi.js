import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

// Sends credentials to the login endpoint and returns the Axios response.
export const loginUser = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.LOGIN, userData)
};

// Sends registration details to the registration endpoint.
export const registerUser = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.REGISTER, userData)
};

//Sends email to the verify email endpoint.
export const verifyEmail = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.VERIFY_EMAIL, userData)
}

//Sends OTP to the verify reset OTP endpoint.
export const verifyResetOtp = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.VERIFY_RESET_OTP, userData)
}

//Sends new password to the reset password endpoint.
export const resetPassword = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, userData)
}



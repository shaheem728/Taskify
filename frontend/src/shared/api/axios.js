import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json",
        Accept: "application/json"
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const acceessToken = localStorage.getItem("token");
        if (acceessToken) {
            config.headers.Authorization = `Bearer ${acceessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Do NOT redirect if the request is login/auth or if already on an auth page
                const isLoginRequest = error.config?.url?.includes("/auth/login");
                const isOnAuthPage = window.location.pathname.startsWith("/auth");

                if (!isLoginRequest && !isOnAuthPage) {
                    localStorage.removeItem("token");
                    window.location.href = "/auth/login";
                }
            } else if (error.response.status === 500) {
                console.error("Server error. Please Try Again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again");
        }
        return Promise.reject(error);
    }
);


export default axiosInstance
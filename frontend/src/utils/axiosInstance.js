import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type': "application/json",
        Accept:"application/json"
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) =>{
        const acceessToken = localStorage.getItem("token");
        if(acceessToken){
            config.headers.Authorization = `Bearer ${acceessToken}`
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
  (response)=>{
   return response
  },
    (error)=>{
        //Handle Comman Errors Globally
        if(error.response){
            if(error.response.status === 401){
            //Redirect to Login Page
            window.location.href = "/login";
            }else if(error.response.status === 500){
            console.error("Server error.Please Try Again later")}
        }else if(error.code === "ECONNABORTED"){
            console.error("Request timeout.Please try again")
        }
            return Promise.reject(error)
        } 

)


     

export default axiosInstance
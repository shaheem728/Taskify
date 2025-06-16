export const BASE_URL = 'http://localhost:8800'


//utils/apiPaths.js
export const API_PATHS = {
    AUTH:{
        REGISTER:"/api/auth/register",//Register a new user(Admin or Member)
        LOGIN:"/api/auth/login",//Authenticate user  & return JWT Token
        GET_PROFILE:"/api/auth/profile",//Get Logged-in user detail
    },
    USER:{
        GET_ALL_USER:"/api/users",//Get All users (Admin only)
        GET_USER_BY_ID:(userId)=>`/api/users/${userId}`,//Get user by id 
        CREAT_USER:"/api/users",//Create A new User (Admin only)
        UPDATE_USER:(userId)=>`/api/users/${userId}`,//Update user details
        DELETE_USER:(userId)=>`/api/users/${userId}`,//Delete a user
    },
    TASKS:{
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data",//Get Dashboard Data
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data",//Get Dash board data 
        GET_ALL_TASKS:"/api/tasks",//Get All tasks(Admin:All,user:Only Assign)
        GET_TASK_BY_ID:(taskId)=>`/api/tasks/${taskId}`, //Get task By Id
        CREATE_TASK:"/api/tasks",//Create a new task(Admin only)
        UPDATE_TASK:(taskId)=>`/api/tasks/${taskId}`,//Update task Detail
        DELETE_TASK:(taskId)=>`/api/tasks/${taskId}`,//Delete a task (Admin only)

        UPDATE_TASK_STATUS:(taskId)=>`/api/tasks/${taskId}/status`,//Update Task_Status
        UPDATE_TODO_CHECKLIST:(taskId)=>`/api/tasks/${taskId}/todo`,//update todo checklist
    },
    REPORT:{
        EXPORT_TASK:"/api/reports/export/tasks",//Download all  tasks as an Excel/PDF report
        EXPORT_USER:"/api/reports/export/users",//Download user-task report
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",//Upload image
    }

}
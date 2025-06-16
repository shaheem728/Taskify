import axiosInstance from "./axiosInstance";
import { API_PATHS, BASE_URL } from "./apiPaths";

const uploadImage = async(imagefile)=>{
    const formData = new FormData();
    //Append Image file to form data
    formData.append('image', imagefile);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',//Set header for file upload
            },
        });
        console.log(response.data)
        return response.data;//Return response data
    }catch(error){
        console.error('Error uploading the image',error);
        throw error;//Rethrow error for handling
    }
}

export default uploadImage
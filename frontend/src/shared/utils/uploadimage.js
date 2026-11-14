import axiosInstance from "@/shared/api/axios";

const uploadImage = async (imagefile) => {
    const formData = new FormData();
    //Append Image file to form data
    formData.append('image', imagefile);
    try {
        const response = await axiosInstance.post(`/api/auth/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',//Set header for file upload
            },
        });
        return response.data;//Return response data
    } catch (error) {
        console.error('Error uploading the image', error);
        throw error;//Rethrow error for handling
    }
}

export default uploadImage
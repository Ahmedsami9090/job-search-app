import { v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})
export const uploadFile = async (file, folder = 'general')=>{
    try {
        const {public_id, secure_url} = await cloudinary.uploader.upload(file, {
            folder : folder
        })
        return {public_id, secure_url}
    } catch (error) {
        console.log(error);
        
        return {error : `Failed to upload File. ${error.message}`}
    }
}
export const deleteFile = async (public_id)=>{
    try {
        const result = await cloudinary.uploader.destroy(public_id)
        return result
    } catch (error) {
        return {error : `Failed to remove file. ${error}`}
    }
}
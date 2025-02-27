import multer from "multer"

export const fileTypes = {
    image : ['image/jpeg', 'image/png', 'image/webp', 'image/svg'],
    video : ['video/mp4', 'video/webm', 'video/ogg', 'video/mkv'],
    pdf : ['application/pdf'],
    audio : ['audio/mp3', 'audio/aac', 'audio/ogg', 'audio/wav']
}

const handleFileUpload = (validTypes = [])=>{
    const storage = multer.diskStorage({})
    const fileFilter = (req,file,cb)=>{
        if(validTypes.includes(file.mimetype)){
            cb(null, true)
        }
        else{
            cb(new Error("Invalid file type", false))
        }
    }
    const upload = multer({storage, fileFilter})
    return upload
}

export default handleFileUpload
import multer from "multer"

// multer.diskStorage => this is hard storage. this is slow. so we use RAM (memoryStorage). 
const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }   // limit is -> 5MB
})
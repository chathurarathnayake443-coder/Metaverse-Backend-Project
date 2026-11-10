import multer from "multer"

// multer.diskStorage => this is hard storage. this is slow. so we use RAM (memoryStorage). 
const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }   // limit is -> 5MB
})

const imageTypes = ["image/jpeg", "image/png", "image/webp"]

export const uploadImageFile = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },   // 2MB
    fileFilter: (_req, file, cb) =>
        imageTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only JPG, PNG or WEBP images are allowed"))
})
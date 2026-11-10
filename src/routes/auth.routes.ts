import { Router } from "express"
import { register, login, getMyDetails, companyRegister, updateProfileImage } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"
import { uploadImageFile } from "../middleware/upload"

const router = Router()

// public endpoints
router.post("/register", register)
router.post("/login", login)
router.post("/company-signup", companyRegister)
router.put("/profile-image", authenticate, uploadImageFile.single("image"), updateProfileImage)

// protected endpoints
router.get("/me",authenticate, getMyDetails) // setting the "authenticate" middleware only in the endpoints we want

export default router
import { Router } from "express"
import { authenticate } from "../middleware/auth"
import { createVacancy } from "../controllers/vacancy.controller"
import { upload } from "../middleware/upload"

const router = Router()

router.post("/create-vacancy", authenticate, upload.single("task"),createVacancy)

export default router

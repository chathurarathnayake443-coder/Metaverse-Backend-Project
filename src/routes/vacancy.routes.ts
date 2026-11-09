import { Router } from "express"
import { authenticate } from "../middleware/auth"
import { createVacancy, getAllVacancies } from "../controllers/vacancy.controller"
import { upload } from "../middleware/upload"

const router = Router()

router.post("/create-vacancy", authenticate, upload.single("task"),createVacancy)
router.get("/all-vacancies", authenticate, getAllVacancies)

export default router

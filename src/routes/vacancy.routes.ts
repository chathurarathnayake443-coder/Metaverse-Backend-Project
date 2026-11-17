import { Router } from "express"
import { authenticate } from "../middleware/auth"
import { createVacancy, getAllVacancies, getCompanyVacancies, getVacancyById, deleteVacancy } from "../controllers/vacancy.controller"
import { upload } from "../middleware/upload"
import { authorize } from "../middleware/role"
import { UserRole } from "../model/user.model"

const router = Router()

router.post("/create-vacancy", authenticate, upload.single("task"),createVacancy)
router.get("/all-vacancies", authenticate, getAllVacancies)
router.get("/vacancies/mine", authenticate, authorize(UserRole.COMPANY), getCompanyVacancies)
router.get("/vacancies/:id", authenticate, authorize(UserRole.SEEKER), getVacancyById)
router.delete("/delete-vacancy/:id", authenticate, authorize(UserRole.COMPANY), deleteVacancy)

export default router

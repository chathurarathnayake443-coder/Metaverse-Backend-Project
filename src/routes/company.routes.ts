import { Router } from "express";
import { upload } from "../middleware/upload"
import { authorize } from "../middleware/role"
import { UserRole } from "../model/user.model"
import { authenticate } from "../middleware/auth"
import { getMyCompany } from "../controllers/company.controller"

const router = Router()

router.get("/me", authenticate, authorize(UserRole.COMPANY), getMyCompany)

export default router
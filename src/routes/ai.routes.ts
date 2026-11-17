import { Router } from "express";
import { upload } from "../middleware/upload"
import { authorize } from "../middleware/role"
import { UserRole } from "../model/user.model"
import { authenticate } from "../middleware/auth"
import { generateRoles } from "../controllers/ai.controller";

const router = Router()

router.post("/cv-analysis", authenticate, authorize(UserRole.SEEKER), upload.single("cv"), generateRoles)

export default router
import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { authorize } from "../middleware/role";
import { UserRole } from "../model/user.model";
import { createSubmission } from "../controllers/submission.controller";

const router = Router()

router.post("/apply-post/:vacancyId", authenticate, authorize(UserRole.SEEKER), upload.single("cv"), createSubmission)


export default router
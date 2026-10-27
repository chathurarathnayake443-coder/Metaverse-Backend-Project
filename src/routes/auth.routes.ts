import { Router } from "express"
import { register } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

// public endpoints
router.post("/register", register)

// protected endpoints
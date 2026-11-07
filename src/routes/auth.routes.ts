import { Router } from "express"
import { register, login, getMyDetails, companyRegister } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

// public endpoints
router.post("/register", register)
router.post("/login", login)
router.post("/company-signup", companyRegister)

// protected endpoints
router.get("/me",authenticate, getMyDetails) // setting the "authenticate" middleware only in the endpoints we want

export default router
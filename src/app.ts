import express, { type Request, type Response } from "express"
import cors from "cors"
import AuthRouter from "./routes/auth.routes"
import VacancyRouter from "./routes/vacancy.routes"
import CompanyRouter from "./routes/company.routes"
import SubmissionRouter from "./routes/submission.routes"

const app = express()

app.use(express.json())
const allowedOrigins = [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"  
]

app.use(cors({
    origin: (origin, callback) => {
    
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

app.get("/env-check", (req, res) => {
  res.json({
    hasMongo: !!process.env.MONGO_URL,  
    hasJwt: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV
  })
})

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/vacancy", VacancyRouter)
app.use("/api/v1/company", CompanyRouter)
app.use("/api/v1/submission", SubmissionRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "This is the MetaVerse Test API !" })
})

export default app
import express, { type Request, type Response } from "express"
import cors from "cors"
import AuthRouter from "./routes/auth.routes"
import VacancyRouter from "./routes/vacancy.routes"
import CompanyRouter from "./routes/company.routes"
import SubmissionRouter from "./routes/submission.routes"
import AiServiceRouter from "./routes/ai.routes"

const app = express()

app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://metaverse-frontend-project.vercel.app", 
]

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {

    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/metaverse-frontend-project-[a-z0-9]+\.vercel\.app$/.test(origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/vacancy", VacancyRouter)
app.use("/api/v1/company", CompanyRouter)
app.use("/api/v1/submission", SubmissionRouter)
app.use("/api/v1/generate-content", AiServiceRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "This is the MetaVerse Test API !" })
})

export default app
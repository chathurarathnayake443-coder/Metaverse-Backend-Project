import express, { type Request, type Response } from "express"
import cors from "cors"
import AuthRouter from "./routes/auth.routes"
import VacancyRouter from "./routes/vacancy.routes"
import CompanyRouter from "./routes/company.routes"
import SubmissionRouter from "./routes/submission.routes"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/vacancy", VacancyRouter)
app.use("/api/v1/company", CompanyRouter)
app.use("/api/v1/submission", SubmissionRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "This is the MetaVerse Test API !" })
})

export default app
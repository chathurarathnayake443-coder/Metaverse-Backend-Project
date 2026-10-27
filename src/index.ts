import express, {type Request, type Response} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const MONGO_URL = process.env.MONGO_URL || ""
const PORT = process.env.PORT || 3000

const app = express() // creates express application

app.use(express.json())  // a built in middleware, which reads the body of all incoming requests and turns JSON into Javascript Objects.

app.use(cors())

app.get("/", (req:Request, res:Response) => {
    res.status(200).json({message:"This is the Test API !"})
})

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MONGO DB Connected!")

        app.listen(PORT, () => {
            console.log(`Server is Running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Failed to Connect MONGO DB...!")
        console.log(error.message)
    })
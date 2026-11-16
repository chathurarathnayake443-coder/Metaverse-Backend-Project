import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app"

dotenv.config()

const MONGO_URL = process.env.MONGO_URL || ""
const PORT = process.env.PORT || 3000

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
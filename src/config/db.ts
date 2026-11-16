import mongoose from "mongoose"

let connected = false

export const connectDB = async () => {
    if (connected) return
    await mongoose.connect(process.env.MONGO_URL as string)
    connected = true
}
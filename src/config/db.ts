// import mongoose from "mongoose"

// let connected = false

// export const connectDB = async () => {
//     if (connected) return
//     await mongoose.connect(process.env.MONGO_URL as string)
//     connected = true
// }

import mongoose from "mongoose"

let connectionPromise: Promise<typeof mongoose> | null = null

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI as string)
  }
  return connectionPromise
}
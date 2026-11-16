import app from "../src/app"
import { connectDB } from "../src/config/db"

export default async function handler(req: any, res: any) {
  try {
    await connectDB()
  } catch (err) {
    console.error("DB connect error:", err)
    return res.status(500).json({ message: "Database connection failed" })
  }

  return app(req, res)
}
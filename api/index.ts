// import app from "../src/app"

// export default app

import app from "../src/app"
import { connectDB } from "../src/config/db"   // adjust the path

export default async function handler(req: any, res: any) {
  try {
    await connectDB()
  } catch (err: any) {
    console.error("DB connect error:", err)
    return res.status(500).json({ message: "Database connection failed", debug: err?.message })
  }
  return app(req, res)
}
// import app from "../src/app"

// export default app

// import app from "../src/app"
// import { connectDB } from "../src/config/db"   // adjust the path

// export default async function handler(req: any, res: any) {
//   try {
//     await connectDB()
//   } catch (err: any) {
//     console.error("DB connect error:", err)
//     return res.status(500).json({ message: "Database connection failed", debug: err?.message })
//   }
//   return app(req, res)
// }

import app from "../src/app"
import { connectDB } from "../src/config/db"   

export default async function handler(req: any, res: any) {
  if (req.url?.includes("env-check")) {
    return res.status(200).json({
      hasMongo: !!process.env.MONGO_URI,  
      hasJwt: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV,
      matchingNames: Object.keys(process.env).filter((k) =>
        /mongo|db|uri|jwt|secret/i.test(k)
      ),
    })
  }

  try {
    await connectDB()
  } catch (err: any) {
    console.error("DB connect error:", err)
    return res.status(500).json({ message: "Database connection failed", debug: err?.message })
  }
  return app(req, res)
}
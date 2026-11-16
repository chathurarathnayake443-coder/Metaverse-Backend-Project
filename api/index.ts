// import app from "../src/app"
// import { connectDB } from "../src/config/db"

// export default async function handler(req: any, res: any) {
//     await connectDB()
//     return app(req, res)
// }

export default async function handler(req: any, res: any) {
  try {
    const { default: app } = await import("../src/app")
    return app(req, res)
  } catch (err: any) {
    console.error(err)
    res.statusCode = 500
    res.setHeader("Content-Type", "text/plain")
    res.end(`STARTUP ERROR:\n${err?.message}\n\n${err?.stack}`)
  }
}
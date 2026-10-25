import {IUser} from "../model/user.model"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() // this reads .env and copies each line from it to process.env, so i can use content inside .env in any file

// getting two jwt secret keys to this file

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string
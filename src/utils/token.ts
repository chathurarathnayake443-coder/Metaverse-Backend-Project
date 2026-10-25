import {IUser} from "../model/user.model"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() // this reads .env and copies each line from it to process.env, so i can use content inside .env in any file

// getting two jwt secret keys to this file

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

// funtion to generate access token

export const signAccessToken = (user:IUser):string => { // takes one parameter called user and the type of it is, "IUser", and returns a string value (JWT token)
    return jwt.sign({
        sub: user._id.toString(),
        roles:user.roles,
        email:user.email
    }, JWT_SECRET,{expiresIn:"30m"})
}

export const signRefreshToken = (user:IUser):string => {
    return jwt.sign({
        sub:user._id.toString(),
    }, JWT_REFRESH_SECRET, {expiresIn:"7d"})
}
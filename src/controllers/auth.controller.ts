import {Request, Response} from "express"
import {UserModel, UserRole, UserStatus} from "../model/user.model"
import { SeekerModel } from "../model/seeker.model"
import bcrypt from "bcryptjs"
import { signAccessToken, signRefreshToken } from "../utils/token"
import { AuthRequest } from "../middleware/auth"
import jwt from "jsonwebtoken"

export const register = async (req:Request, res:Response) => {
    try{
        const {name, email, address, contact, company, jobRole, password, gitHubUrl, linkedInUrl, isEmployeed} = req.body
        const extUser = await UserModel.findOne({email})
        if(extUser){
            return res.status(400).json({
                message:"User Already Exists !..."
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = new UserModel({
            fullName: name,
            email: email,
            address: address,
            telephone: contact,
            password: hashedPassword,
            userStatus: UserStatus.ACTIVE,
            roles: [UserRole.SEEKER],
            approve: true
        })
        await newUser.save()

        try{
            const newSeeker = new SeekerModel({
                user: newUser._id,
                githubUrl: gitHubUrl,
                linkedInUrl: linkedInUrl,
                isEmployeed: isEmployeed,
                currentCompanyName: isEmployeed? company : "undefined",
                currentJobRole: isEmployeed? jobRole : "undefined",
            })
            await newSeeker.save()
        }
        catch(error){
            await UserModel.findByIdAndDelete(newUser._id) // a rollback step if seeker doesn't saved
            console.log(error)
        }
        res.status(201).json({message:"Registration Successfull !..."})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Registration Failed !..."})
    }
}
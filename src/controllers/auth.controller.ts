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

export const login = async (req:Request, res:Response) => {
    const{email, password} = req.body

    try{
        if(!email || !password){
            return res.status(400).json({message:"Email or Password Missing !..."})
        }

        const user = await UserModel.findOne({email: email}) // can be written as ({email}) also, because key and value names are equal
        if(!user){
            return res.status(401).json({message:"User Not Found !..."})
        }

        const isValid = await bcrypt.compare(password, user?.password)
        if(!isValid){
            return res.status(401).json({message:"Invalid Credentials !..."})
        }

        const accessToken = signAccessToken(user)
        const refreshToken = signRefreshToken(user)

        res.status(200).json({message:"Authentication Successful !",data:{
            email: user?.email,
            roles: user?.roles,
            access_token: accessToken,
            refresh_token: refreshToken
        }})
    }
    catch(error){
        console.log("Error in login function",error)
    }
}

// Protected Endpoints

export const getMyDetails = async (req:AuthRequest, res:Response) => {
    
    try{
        if(!req.user){
        return res.status(401).json({message:"Unauthorized !..."})
    }

    const userId = req.user.sub
    const user = await UserModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({message:"User Not Found !..."})
    }

    const {fullName, email, roles, _id, profileImage} = user
    res.status(200).json({message:"get MyDetails Success !", data:{fullName,email,roles,profileImage, id:_id}})
    }
    catch(error){
        console.error("Error in getMyDetails",error)
        res.status(500).json({message:"Failed to Fetch User !..."})
    }
}
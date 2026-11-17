import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { generateSuggestedRoles } from "../services/ai.service";

export const generateRoles = async (req:AuthRequest, res:Response) => {
    try{
        const file = req.file

        if(!file){
            return res.status(404).json({message:"No File Found !..."})
        }

        const roles = await generateSuggestedRoles(file)
        res.status(200).json({
            message:"Generation Success !...",
            data: roles
        })
    }
    catch(error){
        console.error("Error in Generate Roles AI method", error)
        res.status(500).json({message:"Failed to Generate Roles !..."})
    }
}
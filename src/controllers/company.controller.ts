import { Response } from "express"
import { AuthRequest } from "../middleware/auth"
import { UserModel } from "../model/user.model"
import { CompanyModel } from "../model/company.model"

export const getMyCompany = async (req:AuthRequest, res:Response) => {
    try{
        const userId = req.user.sub

        const user = await UserModel.findById(userId).select("fullName address profileImage")
        const company = await CompanyModel.findOne({user:userId}).select("description noOfVerifiedOfficers noOfVacanciesPosted")

        if(!user || !company){
            return res.status(404).json({message:"Company Not Found !..."})
        }

        res.status(200).json({
            message:"Success",
            data:{
                name:user.fullName,
                address:user.address,
                profileImage:user.profileImage,
                website:company.website,
                description:company.description,
                noOfVerifiedOfficers:company.noOfVerifiedOfficers,
                noOfVacanciesPosted:company.noOfVacanciesPosted
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Failed to Load Company !..."})
    }
}

export const editDescription = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.sub
        const { description } = req.body

        if (typeof description !== "string" || description.trim() === "") {
            return res.status(400).json({ message: "Description is required" })
        }

        const company = await CompanyModel.findOneAndUpdate(
            { user: userId },
            { description: description.trim() },
            { new: true, runValidators: true }
        )

        if (!company) {
            return res.status(404).json({ message: "Company Not Found !..." })
        }

        return res.status(200).json({
            message: "Description updated successfully",
            company
        })
    } catch (error) {
        console.error("editDescription error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

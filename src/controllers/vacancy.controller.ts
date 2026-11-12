import { Request, Response } from "express"
import { UserModel } from "../model/user.model"
import { uploadFile } from "../services/storage.services"
import { VacancyModel } from "../model/vacancy.model"
import { AuthRequest } from "../middleware/auth"
import { VacancyStatus } from "../model/vacancy.model"
import { isValidObjectId } from "mongoose"

export const createVacancy = async (req:AuthRequest, res:Response) => {

    const {title, description, deadline} = req.body

    try{
        if(!req.user){
            return res.status(404).json({message:"Unauthorized !..."})
        }

        const userId = req.user.sub
        const user = await UserModel.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({mesage:"User Not Found !..."})
        }

        const fileURL = req.file? await uploadFile(req.file, "vacancies") : ""

        const vacancy = await VacancyModel.create({
            title,
            description,
            deadlineDate:deadline,
            company:user._id,
            taskPdfUrl:fileURL,
            currentSubmissionCount:0,
            vacancyStatus:VacancyStatus.ONGOING
        })
        res.status(201).json({message:"Vacancy Posted Successfully !...", data:vacancy})
    }
    catch(error){
        console.error("Error in Creating Vacancy Post", error)
        res.status(500).json({message:"Failed to Create the Vacancy Post !..."})
    }
}

// all companies
export const getAllVacancies = async (req:AuthRequest, res:Response) => {
    try{
        const vacancies = await VacancyModel.find().populate("company","fullName profileImage").sort({createdAt: -1})
        res.status(200).json(vacancies)
    }
    catch(error){
        console.error("Error in getAllNotes", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// for specific company
export const getCompanyVacancies = async (req:AuthRequest, res:Response) => {
    try{
        const vacancies = await VacancyModel.find({company: req.user.sub}).
            populate("company", "fullName profileImage currentSubmissionCount vacancyStatus title description deadlineDate").sort({createdAt: -1})
        
        res.status(200).json(vacancies)    
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Failed to fetch Vacancies !..."})
    }
}

export const getVacancyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid vacancy id !..." })
        }

        const vacancy = await VacancyModel.findById(id)
            .select("title description taskPdfUrl createdAt deadlineDate currentSubmissionCount company")
            .populate<{ company: { fullName: string; profileImage?: string } | null }>(
                "company",
                "fullName profileImage"
            )

        if (!vacancy) {
            return res.status(404).json({ message: "Vacancy Not Found !..." })
        }

        res.status(200).json({
            message: "Success",
            data: {
                _id: vacancy._id,
                companyName: vacancy.company?.fullName ?? "Unknown company",
                companyProfileImage: vacancy.company?.profileImage ?? null,
                title: vacancy.title,
                description: vacancy.description,
                taskPdfUrl: vacancy.taskPdfUrl,
                deadlineDate: vacancy.deadlineDate,
                currentSubmissionCount: vacancy.currentSubmissionCount,
                createdAt: vacancy.createdAt
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch vacancy !..." })
    }
}
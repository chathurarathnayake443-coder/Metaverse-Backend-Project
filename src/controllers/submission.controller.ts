import { Response } from "express"
import { VacancyModel } from "../model/vacancy.model"
import { uploadFile } from "../services/storage.services"
import { AuthRequest } from "../middleware/auth"
import { SubmissionModel, SubmissionStatus } from "../model/submission.model"
import { isValidObjectId } from "mongoose"

export const createSubmission = async (req: AuthRequest, res: Response) => {
    const { githubURL, linkedInURL, sampleURL1, sampleURL2, sampleURL3 } = req.body
    const { vacancyId } = req.params

    if (typeof vacancyId !== "string" || !isValidObjectId(vacancyId)) {
    return res.status(400).json({ message: "Invalid vacancy id !..." })
    }

    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized !..." })
        }
        if (!isValidObjectId(vacancyId)) {
            return res.status(400).json({ message: "Invalid vacancy id !..." })
        }
        if (!githubURL || !linkedInURL || !req.file) {
            return res.status(400).json({ message: "GitHub URL, LinkedIn URL and CV are required !..." })
        }

        const userId = req.user.sub

        const vacancy = await VacancyModel.findById(vacancyId)
        if (!vacancy) {
            return res.status(404).json({ message: "Vacancy Not Found !..." })
        }
        if (vacancy.deadlineDate < new Date()) {
            return res.status(400).json({ message: "The deadline has passed !..." })
        }

        const alreadyApplied = await SubmissionModel.exists({ user: userId, vacancy: vacancyId })
        if (alreadyApplied) {
            return res.status(409).json({ message: "You have already applied to this vacancy !..." })
        }

        const cvUrl = await uploadFile(req.file, "cvs")

        const submission = await SubmissionModel.create({
            user: userId,
            vacancy: vacancyId,
            githubRepoUrl: githubURL,
            linkedInUrl: linkedInURL,
            sampleProjectUrl1: sampleURL1,
            sampleProjectUrl2: sampleURL2,
            sampleProjectUrl3: sampleURL3,
            cvUrl,
            submissionStatus: SubmissionStatus.PENDING  
        })

        await VacancyModel.updateOne({ _id: vacancyId }, { $inc: { currentSubmissionCount: 1 } })

        res.status(201).json({ message: "Submission Successful !...", data: submission })
    } catch (error) {
        console.error("Error in createSubmission", error)
        res.status(500).json({ message: "Failed to submit !..." })
    }
}

export const fetchSubmissions = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized !..." })
        }

        const { vacancyId } = req.params
        if (typeof vacancyId !== "string" || !isValidObjectId(vacancyId)) {
            return res.status(400).json({ message: "Invalid vacancy id !..." })
        }

        const userId = req.user.sub

        const vacancy = await VacancyModel.findById(vacancyId)
            .populate<{ company: { _id: any; fullName: string; profileImage?: string } | null }>(
                "company",
                "fullName profileImage"
            )

        if (!vacancy) {
            return res.status(404).json({ message: "Vacancy Not Found !..." })
        }

        if (!vacancy.company || vacancy.company._id.toString() !== userId) {
            return res.status(403).json({ message: "This is not your vacancy !..." })
        }

        const submissions = await SubmissionModel.find({ vacancy: vacancyId })
            .populate("user", "fullName email telephone profileImage")
            .sort({ createdAt: -1 })

        res.status(200).json({
            message: "Success",
            data: {
                vacancy: {
                    _id: vacancy._id,
                    title: vacancy.title,
                    description: vacancy.description,
                    taskPdfUrl: vacancy.taskPdfUrl,
                    deadlineDate: vacancy.deadlineDate,
                    createdAt: vacancy.createdAt,
                    companyName: vacancy.company.fullName,
                    companyProfileImage: vacancy.company.profileImage ?? null
                },
                submissions
            }
        })
    } catch (error) {
        console.error("Error in fetchSubmissions", error)
        res.status(500).json({ message: "Failed to fetch submissions !..." })
    }
}
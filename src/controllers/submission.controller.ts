import { Request, Response } from "express"
import { SeekerModel } from "../model/seeker.model"
import { VacancyModel } from "../model/vacancy.model"
import { uploadFile } from "../services/storage.services"
import { AuthRequest } from "../middleware/auth"
import { SubmissionStatus } from "../model/submission.model"

export const createSubmission = async (req:AuthRequest, res:Response) => {

    const {} = req.body

}
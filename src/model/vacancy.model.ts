import {Document, model, Schema, Types} from "mongoose"

export enum VacancyStatus{
    ONGOING = "ONGOING",
    EXPIRED = "EXPIRED"
}

export interface IVacancy extends Document{
    company: Types.ObjectId,
    title: string,
    description: string,
    deadlineDate: Date,
    taskPdfUrl: string,
    currentSubmissionCount: number,
    vacancyStatus: VacancyStatus,
    createdAt: Date,     
    updatedAt: Date 
}

const vacancySchema = new Schema<IVacancy>(
    {
        company: {
            type: Schema.Types.ObjectId, 
            ref: "system_users", 
            required: true
        },
        title: {type:String, required:true},
        description: {type:String, required:true},
        deadlineDate: {type:Date , required:true},
        taskPdfUrl: {type:String, required: true},
        currentSubmissionCount: {type:Number, required:true},
        vacancyStatus: {
            type: String,
            enum: Object.values(VacancyStatus),
            default: VacancyStatus.ONGOING
        }
    },
    {timestamps:true}
)

export const VacancyModel = model<IVacancy>("vacancies", vacancySchema)
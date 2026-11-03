import {Document, model, Schema, Types} from "mongoose"

export enum VacancyStatus{
    ONGOING = "ONGOING",
    EXPIRED = "EXPIRED"
}

export interface IVacancy extends Document{
    user: Types.ObjectId,
    title: string,
    description: string,
    deadlineDate: Date,
    currentSubmissionCount: number,
    vacancyStatus: VacancyStatus
}

const vacancySchema = new Schema<IVacancy>(
    {
        user: {type: Schema.Types.ObjectId, ref: "companies", required: true},
        title: {type:String, required:true},
        description: {type:String, required:true},
        deadlineDate: {type:Date , required:true},
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
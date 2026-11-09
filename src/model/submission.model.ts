import {Schema, model, Types, Document} from "mongoose"

export enum SubmissionStatus{
    SUBMITTED = "SUBMITTED",
    PENDING = "PENDING"
}

export interface ISubmission extends Document{
    user:Types.ObjectId,
    vacancy:Types.ObjectId,
    githubRepoUrl:string,
    linkedInUrl:string,
    sampleProjectUrl1?:string,
    sampleProjectUrl2?:string,
    sampleProjectUrl3?:string,
    cvUrl:string,
    submissionStatus:SubmissionStatus
}

const submissionSchema = new Schema<ISubmission>(
    {
        user:{type: Schema.Types.ObjectId, ref:"seekers", required:true},
        vacancy:{type: Schema.Types.ObjectId, ref:"vacancies",required:true},
        githubRepoUrl:{type:String, required:true},
        linkedInUrl:{type:String, required:true},
        sampleProjectUrl1:{type:String},
        sampleProjectUrl2:{type:String},
        sampleProjectUrl3:{type:String},
        cvUrl:{type:String, required:true},
        submissionStatus:{
            type:String,
            enum:Object.values(SubmissionStatus),
            default:SubmissionStatus.PENDING
        }
    },
    {timestamps:true}
)

export const SubmissionModel = model<ISubmission>("submissions",submissionSchema)
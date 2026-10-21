import {Document, model, Schema, Types} from "mongoose"

export enum VerifyStatus{
    VERIFIED = "VERIFIED",
    NOT_VERIFIED = "NOT_VERIFIED"
}

export interface ICompany extends Document{
    user:Types.ObjectId
    website:string
    description:string
    noOfVerifiedOfficers:number
    noOfVacanciesPosted:number
    isVerified:VerifyStatus
}

const companySchema = new Schema<ICompany>(
    {
        user: { type: Schema.Types.ObjectId, ref: "system_users", required: true, unique: true },
        website:{type:String, required:true},
        description:{type:String},
        noOfVerifiedOfficers:{type:Number, default:0, required:true},
        noOfVacanciesPosted:{type:Number, default:0, required:true},
        isVerified: {
                    type: String,
                    enum: Object.values(VerifyStatus),
                    default: VerifyStatus.NOT_VERIFIED
                    },
    },
    {timestamps:true}
)

export const CompanyModel = model<ICompany>("companies",companySchema)
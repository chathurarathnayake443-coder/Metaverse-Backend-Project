import {Document, model, Schema, Types} from "mongoose"

export enum VerifyStatus{
    VERIFIED = "VERIFIED",
    NOT_VERIFIED = "NOT_VERIFIED"
}

export interface IOfficer extends Document{
    user:Types.ObjectId
    currentCompanyName:string
    currentJobRole:string
    isVerified:VerifyStatus
}

const officerSchema = new Schema<IOfficer>(
    {
        user: { type: Schema.Types.ObjectId, ref: "system_users", required: true, unique: true },
        currentCompanyName:{type:String, required:true},
        currentJobRole:{type:String,required:true},
        isVerified: {
                    type: String,
                    enum: Object.values(VerifyStatus),
                    default: VerifyStatus.NOT_VERIFIED
                },
    },
    {timestamps:true}
)

export const OfficerModel = model<IOfficer>("officers",officerSchema)
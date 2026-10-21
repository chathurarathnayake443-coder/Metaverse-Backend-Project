import {Document, model, Schema, Types} from "mongoose"

export interface ISeeker extends Document{
    user: Types.ObjectId,
    bio?:string,
    currentCompanyName?:string
    currentJobRole?:string
    githubUrl:string
    linkedInUrl:string
    isEmployeed:boolean
}

const seekerSchema = new Schema<ISeeker>(
    {
        user: { type: Schema.Types.ObjectId, ref: "system_users", required: true, unique: true },
        bio:{type:String},
        currentCompanyName:{type:String},
        currentJobRole:{type:String},
        githubUrl:{type:String, required:true},
        linkedInUrl:{type:String, required:true},
        isEmployeed:{type:Boolean, default:false}
    },
    {timestamps:true}
)

export const seekerModel = model<ISeeker>("seekers",seekerSchema)


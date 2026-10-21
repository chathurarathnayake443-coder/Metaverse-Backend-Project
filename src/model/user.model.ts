import {Document, model, Schema} from "mongoose"

export enum UserRole{
    SEEKER = "SEEKER",
    COMPANY = "COMPANY",
    OFFICER = "OFFICER"
}

export enum UserStatus{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export interface IUser extends Document{
    fullName:string
    email:string
    telephone:string
    address:string
    password:string
    roles:UserRole[] // array of multiple user roles
    userStatus:UserStatus
    profileImage?:string  // because new users dont have a profile picture
    approve:boolean
}

const userSchema = new Schema<IUser>(
    {
        fullName:{type:String, required: true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        telephone:{type:String, required:true, unique:true},
        address:{type:String, required:true},
        roles: {
            type: [String],
            enum: Object.values(UserRole),
            default: [UserRole.SEEKER]
        },
        userStatus: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.ACTIVE
        },
        profileImage:{type:String},
        approve: { type: Boolean, default: false }
    },
  { timestamps: true }
)

export const UserModel = model<IUser>("system_users", userSchema)
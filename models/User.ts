import { model, models, Schema } from 'mongoose';  
  
export interface UserInterface {  
    email: string;  
    password: string;  
    department: string;  
    level: string;
}  
const UserSchema = new Schema<UserInterface>(  
    {  
        email: String,  
        password: String,  
        department: String,  
        level: String,
    },  
    {  
        timestamps: true,  
        toJSON: {  
            versionKey: false,  
            virtuals: true,  
            transform: (_, ret) => {  
                delete ret._id;  
            },
        },  
    },  
);  
const User = models.User || model('User', UserSchema);  
export default User;

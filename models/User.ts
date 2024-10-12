import { model, models, Schema } from 'mongoose';  
  
export interface UserInterface {  
    email: string;  
    password: string;  
    category: string;  
    level: number;
}  
const UserSchema = new Schema<UserInterface>(  
    {  
        email: String,  
        password: String,  
        category: String,  
        level: Number
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

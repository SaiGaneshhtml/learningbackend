import e from 'express';
import mongoose ,{ Schema } from 'mongoose';
import { PiPassword } from 'react-icons/pi';

const userSchema = new Schema(
    {  
        username:{

            type: String,
            required: true,
            unique: true,   
            lowercase: true,
            trim: true,// remove spaces before and after
            minLenghth: 1,
            maxLength: 30,
        },

        Password: {
            type: String,
            required: true,
            minLenghth: 6,
            maxLength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },  
    } ,
    {
            timestamps: true,
        }
      

)
export const User = mongoose.model('User', userSchema);


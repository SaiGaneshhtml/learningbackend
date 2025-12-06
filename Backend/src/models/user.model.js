import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,   
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },  
    loggedIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

// ✅ CORRECT pre-save hook
userSchema.pre('save', async function() {
    try {
        // Only hash if password is modified (new user or password change)
        if (!this.isModified('password')) {
            return;
        }
        
        // Hash password
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);

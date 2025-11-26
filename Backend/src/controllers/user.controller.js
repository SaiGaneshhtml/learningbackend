import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {

    try {
        const { username, password, email } = req.body; 
        
       if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
       }
       // Check if user already exists
       const existing = await User.findOne({ email: email.tolowercase() });
       if (existing) {  
        return res.status(409).json({ message: "User already exists" });
       }

       // Create new user
        const user = await User .create({
            username,
            password,
            email : email.toLowerCase(),
            loggedIn: false,
        });

        res.status(201).json({
          message: "User registered successfully", 
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
    
    
        });


    }catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

};

export {

    registerUser,
};
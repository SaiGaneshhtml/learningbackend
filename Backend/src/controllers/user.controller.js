import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body; 
        
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {  
            return res.status(409).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered successfully", 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
       const {email, password} = req.body;
       console.log('Login attempt with email:', email);  // ← Add this
       
       if (!email || !password) {
           return res.status(400).json({ message: "Email and password are required" });
       }
    
       const user = await User.findOne({
            email: email.toLowerCase() 
        });
        console.log('User found:', user);  // ← Add this
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch);  // ← Add this
        
        if (!isMatch) {
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }
        
        res.status(200).json({ 
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.error('Login error:', error);  // ← This shows the actual error
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ 
            email
        });
        if (!user)  return res.status(404).json({
                 message: "User not found"
                
        });
        res.status(200).json({ 
            message: "Logout successful"
        });
        

    } catch (error) {   
        console.error('Logout error:', error);
         res.status(500).json({
             message: "Internal Server Error"
             }); 

    }
};
export {
    
    registerUser,
    loginUser,
    logoutUser
};
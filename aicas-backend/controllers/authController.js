const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
exports.register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        //check is user exists
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//login
exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!User) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
            // Generate JWT
            const token = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn: "7d"}
            );

            res.status(200).json({
                success: true,
                token
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

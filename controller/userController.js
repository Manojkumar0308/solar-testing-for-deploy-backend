const User = require("../models/userModel");
const verificationStore = require('../utils/verificationstore'); // Import the verification store

//verify email
const verifyEmail = async (req, res) => {
    try {
        const { email, token } = req.body;

        // Retrieve the stored verification details
        const storedData = verificationStore.get(email);
        console.log(storedData.first_name)
        if (!storedData) {
            return res.status(400).json({
                status: 'fail',
                message: 'Verification details not found'
            });
        }

        // Check if the token matches and hasn't expired
        const isTokenValid = storedData.verificationToken === token;
        const isTokenExpired = storedData.tokenExpiry < Date.now();

        if (isTokenExpired) {
            return res.status(400).json({
                status: 'fail',
                message: 'Verification token has expired'
            });
        }

        if (!isTokenValid) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid verification token'
            });
        }

        // If verified, create the user
        const newUser = await User.create({
            first_name: storedData.first_name,
            last_name: storedData.last_name,
            mobile: storedData.mobile,
            email,
            password: storedData.password,
            role: storedData.role,
            isVerified: true
        });

        // Remove the verification details from the store
        verificationStore.delete(email);

        res.status(201).json({
            status: 'success',
            message: 'Email verified and user created successfully',
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};


const registerUser = async (req, res) => {
    const { first_name, last_name, email, password,mobile,role} = req.body;
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        mobile,
        role
    });
    res.status(201).json({
        status: "success",
        user,
    });
};
module.exports = {registerUser,verifyEmail};
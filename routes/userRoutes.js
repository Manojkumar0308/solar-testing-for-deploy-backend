const express = require("express");
const { loginController,verifyEmail,logoutController} = require('../controller/userController');
const { validateAndSendVerificationEmail } = require('../middlewares/errorHandler');
const {authMiddleware} = require('../middlewares/authMiddleware');
const routes = express.Router();
// Endpoint to send verification email
routes.post('/send-verification', validateAndSendVerificationEmail, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Verification email sent. Please check your email.'
    });
});

routes.post('/verify-email', verifyEmail);
routes.post('/login',loginController) 
routes.post('/logout',authMiddleware,logoutController)
module.exports = routes
const express = require("express");
const { loginController,verifyEmail } = require('../controller/userController');
const { validateAndSendVerificationEmail } = require('../middlewares/errorHandler');
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
module.exports = routes
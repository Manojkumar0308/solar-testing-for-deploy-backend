const {sendNotification,getNotifications} = require('../controller/send-Notification-admin');
const {authMiddleware} = require('../middlewares/authMiddleware');
const express = require("express");
const routes = express.Router();
routes.post('/send-notification',authMiddleware, sendNotification);
routes.get('/get-notification/:customer_id',getNotifications);
module.exports = routes
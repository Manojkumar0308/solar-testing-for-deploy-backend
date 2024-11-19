const {sendNotification,getNotifications} = require('../controller/send-Notification-admin');
const {authMiddleware} = require('../middlewares/authMiddleware');
const express = require("express");
const routes = express.Router();
routes.post('/send-notification',authMiddleware, sendNotification);
routes.post('/get-notification',authMiddleware,getNotifications);
module.exports = routes
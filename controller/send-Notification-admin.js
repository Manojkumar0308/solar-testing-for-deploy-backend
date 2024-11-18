const NotificationSchema = require("../models/notificationModel");
const {emitNotification} = require('../utils/socket');

const sendNotification = async (req, res) => {
    try {
      const { customer_id, title, message } = req.body;
      const newNotification = new NotificationSchema({
        customer_id,
        title,
        message,
      });
      const savedNotification = await newNotification.save();
      if(savedNotification){
        emitNotification(savedNotification);
        res.status(200).json({ message: "Notification added successfully", data: savedNotification });
      }
     
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding notification", error: err.message });
    }
  };
  // Controller to fetch all notifications for a specific user
const getNotifications = async (req, res) => {
    const { customer_id } = req.params;
    // const { page = 1, limit = 10 } = req.query;
    try {
      const notifications = await NotificationSchema.find({ customer_id })
      // .skip((page - 1) * limit) // Skip records for the current page
      // .limit(limit) // Limit the number of records per page
      // .sort({ created_at: -1 }); // Optionally, sort by creation date
      const totalCount = await NotificationSchema.countDocuments({ customer_id });
      // console.log(`Page: ${page}, Total Count: ${totalCount}`);
      res.status(200).json({ data: notifications ,totalCount,
        // page,
        // totalPages: Math.ceil(totalCount / limit),
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching notifications", error: err.message });
    }
  };
  
  module.exports = {sendNotification,getNotifications};
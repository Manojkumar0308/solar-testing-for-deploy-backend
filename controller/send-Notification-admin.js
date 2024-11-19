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
 

const getNotifications = async (req, res) => {
  const customer_id = req.user._id; // Assuming customer_id is in req.user from middleware
  console.log('customer_id:', customer_id);

  const { page = 1, limit = 10 } = req.query;
  const { stDate, enDate } = req.body; // Optional date range from request body

  try {
      // Base query for customer_id
      let query = { customer_id };

      // Add date range filter if stDate and enDate are provided
      if (stDate && enDate) {
        const start = new Date(stDate);
        const end = new Date(enDate);
    
        // Add the end of the day for enDate
        end.setHours(23, 59, 59, 999);
    
        query.created_at = { 
            $gte: start, 
            $lte: end 
        };
    }

      const notifications = await NotificationSchema.find(query)
          .skip((page - 1) * limit) // Pagination logic
          .limit(limit)
          .sort({ created_at: -1 }); // Sort by latest first

      const totalCount = await NotificationSchema.countDocuments(query);

      res.status(200).json({
          data: notifications,
          totalCount,
          page,
          totalPages: Math.ceil(totalCount / limit),
      });
      console.log('notifications:', notifications);
  } catch (err) {
      res.status(500).json({ 
          message: "Error fetching notifications", 
          error: err.message 
      });
  }
};

  
  module.exports = {sendNotification,getNotifications};
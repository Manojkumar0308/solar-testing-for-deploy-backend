const {Server} = require("socket.io");
const solarInverterData = require('../models/solarInverterData')
let io;
const connectedUsers = {};
const initSocket = (server) =>{
     io = new Server(server,{ 
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('login', (userDetails) => {
            console.log(`User logged in: ${userDetails.email} the user id is ${userDetails._id} with socket ID: ${socket.id}`);
        });
        socket.on('logout', (userDetails) => {
            console.log(`User logged out: ${userDetails.email} with socket ID: ${socket.id}`);
            socket?.disconnect(); // Disconnect the socket on logout
            socket=null;
          });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
       socket.on('send-inverter-data',  (data) => {
        console.log('New inverter data received:', data);
       });

      
    });
    return io;
}

// Get the initialized io instance
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized!");
    }
    return io;
};

module.exports = {initSocket,getIO};         
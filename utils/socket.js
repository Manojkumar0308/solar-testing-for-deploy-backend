const {Server} = require("socket.io");

const connectedUsers = {};
const initSocket = (server) =>{
    const io = new Server(server,{ 
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('login', (userDetails) => {
            console.log(`User logged in: ${userDetails.email} with socket ID: ${socket.id}`);
        });
        socket.on('logout', () => {
            console.log(`User logged out: ${socket.id}`);
            socket.disconnect(); // Disconnect the socket on logout
          });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    return io;
}

module.exports = {initSocket};         
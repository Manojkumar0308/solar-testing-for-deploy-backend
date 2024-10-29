const socketIo = require("socket.io");
let io;

const initSocket = (server) =>{
   io = socketIo(server);

   io.on('connection',(socket)=>{
    console.log('New client connected',socket.id);
     // Listen for login event
     socket.on('login', (data) => {
        console.log(`User logged in: ${JSON.stringify(data)}`);
    });
    socket.on('disconnect',()=>{
        console.log('Client disconnected',socket.id);
    })
   })
}

const emitLogin = (data) =>{
    if(!io) return;
    console.log("Emitting login event:", data); // Console log for testing
    io.emit('login',data);
}

const emitNotification = (data) =>{
    if(!io) return;
    io.emit('notification',data);
}

const emitSensorData = (data) =>{
    if(!io) return;
    io.emit('sendSensorData',data);
}

module.exports = {initSocket,emitLogin,emitNotification,emitSensorData};
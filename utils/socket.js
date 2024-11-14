      
const socketIo = require('socket.io');

let io;
const connectedClients = {}; // Store connected clients by user ID or socket ID

const initSocket = (server) => {
  // io = socketIo(server, {
  //   cors: {
  //     origin: 'http://localhost:5173',
  //     methods: ["GET", "POST"],
  //     allowedHeaders: ['Content-Type', 'Authorization'],
      
  //   }
  // });

  // io.on('connection', (socket) => {
  //   console.log('New client connected', socket.id);

  //   // Store socket by user ID (you can adjust this to store by user ID instead)
  //   connectedClients[socket.id] = socket;

  //   // Handle disconnection
  //   socket.on('disconnect', () => {
  //     console.log('Client disconnected', socket.id);
  //     delete connectedClients[socket.id];
  //   });
  // });
  if (io) {
    console.log("Socket.IO server already initialized");
    return io; 
  }
    io = socketIo(server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected', socket.id);
      connectedClients[socket.id] = socket;

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        delete connectedClients[socket.id];
      });
    });
  };
 


// Function to emit login event
const emitLogin = (userdata) => {
  if (io) {
    io.emit('login', userdata);
  }
};


const emitNotification = (data) => {
  if (io) {
    io.emit('admin-send-notification', data);
  }
};

// Function to emit real-time inverter data
const emitInverterData = (data) => {
  if (io) {
    
    io.emit('sendInvertersData', data);
  }
};

const emitSensorData = (data) => {
  if (io) {
    io.emit('sendSensorData', data);
  }
}
module.exports = { initSocket, emitLogin, emitNotification, emitInverterData ,emitSensorData};

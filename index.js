const express = require ("express");
const dotenv = require("dotenv");
const {validateAndSendVerificationEmail} = require('./middlewares/errorHandler');
const authRoutes = require("./routes/userRoutes");
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');
const bodyParser = require("body-parser");
dotenv.config();
const {initSocket} = require('./utils/socket');
const dbConnect = require("./config/dbConnect");
const app = express();
dbConnect();

const PORT= process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server)
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your Vite app
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
   
   
};

app.use(cors(corsOptions)); // Use CORS middleware before your routes
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api/user',authRoutes);

// Error handling middlewares

initSocket(server);
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  
})
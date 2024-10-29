const express = require ("express");
const dotenv = require("dotenv");
const {validateAndSendVerificationEmail} = require('./middlewares/errorHandler');
const authRoutes = require("./routes/userRoutes");
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require("body-parser");
dotenv.config();
const dbConnect = require("./config/dbConnect");
const app = express();
dbConnect();

const PORT= process.env.PORT || 5000;
const server = http.createServer(app);
const {initSocket} = require('./utils/socket');


//middlewares
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api/user',authRoutes);

// Error handling middlewares

initSocket(server);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
require('dotenv').config();
// dependencies externs
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// depencies interns
const connectDB = require('./config/connectDB');
// app 
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload( { useTempFiles: true } ));

// routes
app.use('/api/access', require('./routes/userRouter'));
app.use('/api/contact', require('./routes/contactsRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./resources/sendMail'));

// listen
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server in on port ${PORT}`))
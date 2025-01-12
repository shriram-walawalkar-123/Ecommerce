const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Middleware
// app.use(cors({
//   origin: [
//     'https://shrifrontend.vercel.app/',
//     'https://shrifrontend-git-main-shriram-mangesh-walawalkars-projects.vercel.app/',
//     'https://shrifrontend-ppx1bfo1e-shriram-mangesh-walawalkars-projects.vercel.app/',
//     'http://localhost:3000'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
// }));

app.use(cors({
  origin: '*', // Allow access from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  credentials: true, // Include credentials like cookies or headers
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'] // Allowed custom headers
}));

// app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  }));


//config
dotenv.config({
    path:"backend/config/config.env"
})

// Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute')

// Routes
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1',payment)

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;

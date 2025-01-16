const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Middleware
// In your backend app.js or server.js
const allowedOrigins = [
  'https://shrifrontend.vercel.app',  // Your Vercel frontend
  'http://localhost:3000' 
];

app.use(cors({
  origin: function(origin, callback) {
    // For development/testing - allow requests with no origin 
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('Blocked origin:', origin); // For debugging
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Added OPTIONS
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: true,
  optionsSuccessStatus: 204
}));

// Add this before your routes
// app.options('*', cors()); // Enable pre-flight for all routes

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

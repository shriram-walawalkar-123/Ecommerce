const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    let {token} = req.cookies  || req.body.token || req.headres;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token =  req.headers.authorization.split(' ')[1];
    }

    console.log("ashish",token);

    if(!token){
        return next(new ErrorHandler('please login to acess this resource',401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to acess this resource`,403));
        }
        next();
    }
}
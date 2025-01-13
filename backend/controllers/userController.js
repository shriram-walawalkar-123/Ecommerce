const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModel');
const catchAsyncError = require('../middlewares/catchAsyncError');

const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//registration of user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar file is required",
      });
    }
  
    const myCloud = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 200, res);
  });
  

//login a user
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password',400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid email or password',401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('invalid email or password',401));
    }

    sendToken(user,200,res);
})

//logout a user
exports.logoutUser = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"logout is succefull"
    })
})

//forgot a password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('User not found to forgot password',404));
    }

    //get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try{
        await sendEmail({
           email:user.email,
           subject:`Ecommerse Password Recovery`,
           message
        });

        return res.status(200).json({
            success:true,
            message:`email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }
})

//reset a  password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    //creqte token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });

    if(!user){
        return next(new ErrorHandler('reset password token is invalid or been expired',400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('reset password not matched',400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})

//get user details not admin
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    console.log("enter to userDetaisls");

    const user = await User.findById(req.user.id);
    
    console.log("user is :",user);

    res.status(200).json({
        success:true,
        user
    })
})

//update user password
exports.updateUserPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid old password',400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('password not matched',400));
    }

    user.password = req.body.newPassword;

    await user.save();
   
    sendToken(user,200,res);
})


//update user profile by user
exports.updateUserProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Handle avatar update
    if (req.files && req.files.avatar) {
        // Delete old avatar if it exists
        const user = await User.findById(req.user.id);
        if (user.avatar.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        // Upload new avatar
        const myCloud = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully'
    })
});

//get all users by admin
exports.getAllUsersByAdmin = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//get single user details by admin
exports.getUserByAdmin = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`,400));
    }

    res.status(200).json({
        success:true,
        user
    })
})

//update user profile by admin
exports.updateUserByAdmin = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
   
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });

    res.status(200).json({
        success:true,
        message:'profile updated By Admin suceessfully'
    })
})

//Delete user profile by admin
exports.deleteUserByAdmin = catchAsyncError(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id);

    // we will remove cloudinary shortly

    if(!user){
        return next(new ErrorHandler(`user does not exist with id : ${req.params.id}`,400));
    }

    await User.findByIdAndDelete(req.params.id,{
        new:true,
    });

    res.status(200).json({
        success:true,
        message:'User deleted By Admin suceessfully'
    })
})
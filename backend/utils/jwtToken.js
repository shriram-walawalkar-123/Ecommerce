// //create a token and save it in a cookie

// const sendToken = (user,statusCode,res)=>{
//     const token = user.getJWTToken();

//     //options for cookie
//     const options = {
//         expires:new Date(
//             Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
//         ),
//         httpOnly:true
//     }

//     res.status(statusCode).cookie('token',token,options).json({
//         success:true,
//         user,
//         token
//     })
// }

// module.exports = sendToken


const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/'
    };

    // Set token in cookie and send response
    res.status(statusCode)
       .cookie('token', token, options)
       .json({
           success: true,
           user,
           token
       });
};

module.exports = sendToken;
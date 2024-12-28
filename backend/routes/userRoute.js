const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile ,getAllUsersByAdmin,getUserByAdmin,updateUserByAdmin,deleteUserByAdmin} = require('../controllers/userController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser,getUserDetails);

router.route('/password/update').put(isAuthenticatedUser,updateUserPassword);

router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsersByAdmin);

router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles("admin"),getUserByAdmin)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserByAdmin)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserByAdmin)


module.exports = router
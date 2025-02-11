const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails ,createProductReview, getProductReviews,deleteProductReviews, getAdminProducts} = require('../controllers/productController');
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');

const router = express.Router();

router.route('/product').get(isAuthenticatedUser,getAllProducts)

router.route('/admin/product/new')
.post(isAuthenticatedUser,authorizeRoles('admin'),createProduct)

router.route('/admin/products')
.get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts)

router.route('/admin/product/:id')
.put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)

router.route('/product/:id').get(getProductDetails)

router.route('/admin/product/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getProductDetails)

router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteProductReviews)

module.exports = router
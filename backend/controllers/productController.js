const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");
const catchAsyncError = require('../middlewares/catchAsyncError');
const client = require('../redisClient');

//create a product --> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    try {
      let images = [];
  
      // Handle single or multiple images
      if (req.files && req.files.images) {
        images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      }
  
      if (images.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide at least one product image",
        });
      }
  
      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
          folder: "products",
          width: 1000,
          crop: "scale",
          quality: "auto",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        Stock: req.body.Stock,
        images: imagesLinks,
        user: req.user.id,
      };
  
      const product = await Product.create(productData);
  
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      // Rollback Cloudinary uploads if any error occurs
      for (const img of imagesLinks) {
        try {
          await cloudinary.v2.uploader.destroy(img.public_id);
        } catch (deleteError) {
          console.error("Error deleting image:", deleteError);
        }
      }
  
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  });

//get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = Number(req.query.limit) > 0 && Number(req.query.limit) <= 50
        ? Number(req.query.limit)
        : 5;

    // Create a unique cache key based on query params
    const cacheKey = `products:all:${JSON.stringify(req.query)}`;

    // Check Redis cache
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
        console.log('Cache hit: Products list');
        return res.status(200).json(JSON.parse(cachedData));
    }

    console.log('Cache miss: Products list');

    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

    // Count filtered products
    const filteredQuery = new ApiFeatures(Product.find(), req.query).search().filter();
    const filteredProductsCount = await filteredQuery.query.countDocuments();

    // Pagination
    apiFeature.pagination(resultPerPage);

    // Get products
    const products = await apiFeature.query;

    const responseData = {
        success: true,
        message: "All products fetched successfully!",
        products,
        productsCount,
        filteredProductsCount,
        resultPerPage,
    };

    // Store in Redis for 60 seconds
    await client.setEx(cacheKey, 60, JSON.stringify(responseData));

    res.status(200).json(responseData);
});

//get All Products By admin
exports.getAdminProducts = catchAsyncError(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
});

//get a single product
exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not known',404))
    }

    res.status(200).json({
        success:true,
        message:"product found successfully",
        product
    })
})

//Hey Update a product -->admin
exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not known',404))
    }

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }
    else{
        images = req.body.images
    }

    if(images !== undefined){
    for(let i = 0 ; i < product.images.length ; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    const imagesLinks = []
    for(let i = 0 ; i < images.length ; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{folder:"products"})
        imagesLinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
})

//delete a product
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not known',404))
    }

    for(let i = 0 ; i < product.images.length ; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await Product.findByIdAndDelete(req.params.id,{
        new:true,
    });

    res.status(200).json({
        success:true,
        message:'product deleted successfully'
    })
})

//create a new review or update a review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.rating
    })
    

    product.ratings = avg /product.reviews.length

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        message:'rating updated successfully'
    })
})

//get all reviews of a product
exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler('product not found',404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

//Delete A review of a product
exports.deleteProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler('product not found',404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating
    })
    
    const ratings = reviews.length === 0 ? 0 : avg / reviews.length;
 
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    )

    res.status(200).json({
        success:true,
        message:"product review deleted successfully"
    })
})
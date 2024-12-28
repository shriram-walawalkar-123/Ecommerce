const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const Product = require('../models/productModel');


//create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (!shippingInfo || !orderItems || !paymentInfo || !totalPrice) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }

    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});


//get Single Order Details
exports.getSignleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("order not found with this id ",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

//get logged in user Orders
exports.myOrders = catchAsyncError(async(req,res,next)=>{ 
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})


//get All Orders for Admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount  = 0;
    orders.forEach((order)=>{
       totalAmount += order.totalPrice
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


//update Order Status By Admin
exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler(`You have already delivered this order`,400));
    }
    
    if(req.body.status === "Shipped"){
    order.orderItems.forEach(async(o)=>{
        await updateStock(o.product,o.quantity);
    })
    }

    order.orderStatus = req.body.status

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        order
    })
})


const updateStock = async (productId, quantity) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`Product not found with ID: ${productId}`);
        }

        product.Stock -= quantity;

        await product.save({ validateBeforeSave: false });
    } catch (error) {
        console.error('Error updating stock:', error.message);
        throw error;
    }
};


//delete  order by An Admin
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("order not found with this id ",404));
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"order deleted successfully"
    })
})

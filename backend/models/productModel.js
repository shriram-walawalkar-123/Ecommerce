const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name :{
        type : String,
        required : [true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter a product description"]
    },
    price:{
        type:Number,
        required:[true,'please enter a product price'],
        maxLength:[8,'price cannot exceed 8 characters']
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,'please enter product category']
    },
    Stock:{
        type:Number,
        required:[true,'please enter a product stock'],
        maxLength:[4,'stock cant exceed 4 characters'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model("Product",productSchema);
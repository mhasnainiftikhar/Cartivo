import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
         type:String,
        required:true,
        trim:true
    },
    mrpPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    discountPercentage:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
    },
    size:{
        type:String,
    },
},{timestamps:true});

const Products=mongoose.model("Products",productSchema);
export default Products;
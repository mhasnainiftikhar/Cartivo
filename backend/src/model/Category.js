import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
    },
    categoryId:{
        type:String,
        required:true,
        unique:true
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null
    },
    size:{
        type:String,
        required:true
    },
},{timestamps:true});

const Category=mongoose.model("Category",categorySchema);
export default Category;
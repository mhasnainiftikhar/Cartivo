import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    locality:{
        type:String,
    },
    state:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    address:{
        type:String,
    },
    mobile:{
        type:String,
    }
} ,{timestamps:true}
);

const Address=mongoose.model('Address',addressSchema);
export default Address;
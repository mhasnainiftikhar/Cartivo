import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
    otp: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: { expires: 0 }
    }

});


const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);
export default VerificationCode;
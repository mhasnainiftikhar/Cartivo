import jwtProvider from "../utils/JwtProvider.js";
import sellerService from "../service/SellerService.js";
import userService from "../service/UserService.js";
import User from "../model/User.js";
import Seller from "../model/Seller.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing or invalid" });
        }

        const token = authHeader.split(" ")[1];
        const email = jwtProvider.getEmailFromJwt(token);

        if (!email) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await User.findOne({ email });
        if (user) {
            req.user = user;
            return next();
        }

        const seller = await Seller.findOne({ email });
        if (seller) {
            req.seller = seller;
            return next();
        }

        return res.status(401).json({ message: "User/Seller not found" });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default authenticate;

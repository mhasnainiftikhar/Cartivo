import jwtProvider from "../utils/jwtProvider.js";
import sellerService from "../service/SellerService.js";

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

        const seller = await sellerService.getsellerbyEmail(email);
        req.seller = seller;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default authenticate;

import User from "../model/User.js";
import JwtProvider from "../utils/JwtProvider.js";

class UserService {
    // Find user by email
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found with email: " + email);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Find user by JWT
    async findUserByJwt(jwt) {
        try {
            const email = JwtProvider.getEmailFromJwt(jwt);
            if (!email) {
                throw new Error("Invalid token");
            }
            const user = await this.findUserByEmail(email);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();

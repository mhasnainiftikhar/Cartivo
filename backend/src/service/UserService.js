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
            const user = await User.findOne({ email }).populate("addresses");
            if (!user) {
                throw new Error("User not found with email: " + email);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Update user profile
    async updateUserProfile(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).populate("addresses");
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Add user address
    async addUserAddress(userId, addressData) {
        try {
            const Address = (await import("../model/Address.js")).default;
            const address = new Address(addressData);
            await address.save();

            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            user.addresses.push(address._id);
            await user.save();

            return await user.populate("addresses");
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();

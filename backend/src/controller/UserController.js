import userService from "../service/UserService.js";

class UserController {
    // Get user profile
    async getUserProfile(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update user profile
    async updateUserProfile(req, res) {
        try {
            const user = await userService.updateUserProfile(req.user._id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Add user address
    async addUserAddress(req, res) {
        try {
            const user = await userService.addUserAddress(req.user._id, req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.seller) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        if (!allowedRoles.includes(req.seller.role)) {
            return res.status(403).json({ message: "Forbidden - You do not have permission to perform this action" });
        }

        next();
    };
};

export default authorize;

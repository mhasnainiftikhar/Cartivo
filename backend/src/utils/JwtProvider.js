import jwt from 'jsonwebtoken';

class JwtProvider {

      // Method to create a JWT token
    createJwt(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    };
    
     // Method to extract email from JWT token
    getEmailFromJwt(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.email;
        }
        catch (error) {
            throw new Error('Invalid JWT token');
        }
    };

    //Verify JWT token
    verifyJwt(token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    };
}

export default new JwtProvider();
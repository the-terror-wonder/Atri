import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    // Check for the token in the request headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (it's in the format "Bearer TOKEN")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach it to the request object
            // We exclude the password when fetching the user
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Move on to the next function (the controller)
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

export {
    protect
};
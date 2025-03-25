const jwtUtils = require('../utill/jwtUtil');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Access denied, no token provided'
        });
    }

    try {
        const decoded = jwtUtils.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Invalid or expired token'
        })
    }
}

module.exports = authenticateToken;


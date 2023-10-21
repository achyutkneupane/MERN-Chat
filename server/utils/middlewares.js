const jwt = require('jsonwebtoken');
const authenticated = (req, res, next) => {
    const headers = req.headers['authorization'];
    if(!headers) res.status(401).json({message: 'Authentication failed (Header not found)'});
    const token = headers.split(' ')[1];
    if(!token) res.status(401).json({message: 'Authentication failed (Token not found)'});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({message: 'Authentication failed (Invalid Token)'});
        } else {
            req.decoded = decoded;
            next();
        }
    });
}

const middlewares = {
    authenticated
}

module.exports = middlewares;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig_1 = require("../configs/authConfig");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, authConfig_1.authConfig.secret);
        if (typeof decoded === 'string') {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        // Garantindo que o decoded seja do tipo JwtPayload e contenha os atributos esperados
        const decodedUser = decoded;
        req.user = {
            id: decodedUser.id,
            name: '',
            email: '',
            password: '',
            isAdmin: decodedUser.isAdmin
        };
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};
exports.authMiddleware = authMiddleware;

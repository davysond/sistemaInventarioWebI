"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    if (req.user?.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied' });
};
exports.adminMiddleware = adminMiddleware;

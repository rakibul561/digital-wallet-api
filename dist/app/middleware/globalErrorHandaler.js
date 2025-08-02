"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandaler = void 0;
const globalErrorHandaler = (err, req, res, next) => {
    const statusCode = 500;
    const message = `Something Went Wrong!! ${err.message}`;
    res.status(statusCode).json({
        success: false,
        message,
        err
    });
};
exports.globalErrorHandaler = globalErrorHandaler;

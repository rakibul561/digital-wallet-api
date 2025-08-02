"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const userCreateZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(3, "Name Must be in 3 characters")
        .max(255, "Name can't be more that 255 characters"),
    email: zod_1.default.email({ error: "Invalid email" }),
    password: zod_1.default
        .string()
        .min(6, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.default
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
});
const userLoginZodSchema = zod_1.default.object({
    email: zod_1.default.email({ error: "Invalid email" }),
    password: zod_1.default.string(),
});
exports.userZodSchema = {
    userCreateZodSchema,
    userLoginZodSchema,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandaler_1 = require("./app/middleware/globalErrorHandaler");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = require("./app/routes");
const env_1 = require("./config/env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware  use 
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://digital-wallet-opal.vercel.app",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.router);
app.get('/', (req, res) => {
    res.json({ message: 'Digital Wallet API is running!' });
});
// Database connection
mongoose_1.default.connect(env_1.envVars.DB_URL)
    .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server running on port ${env_1.envVars.PORT}`);
    });
})
    .catch((error) => {
    console.error('Database connection failed:', error);
});
app.use(globalErrorHandaler_1.globalErrorHandaler);
app.use(notFound_1.default);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./modules/books/book.route"));
const borrow_route_1 = __importDefault(require("./modules/borrow/borrow.route"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is working Books",
    });
});
// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
    });
});
exports.default = app;

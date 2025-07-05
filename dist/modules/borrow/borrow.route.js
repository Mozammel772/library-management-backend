"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const router = express_1.default.Router();
router.post("/:id", borrow_controller_1.borrowBook);
router.get("/", borrow_controller_1.totalBorrowed);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Genre = void 0;
const mongoose_1 = require("mongoose");
var Genre;
(function (Genre) {
    Genre[Genre["Fiction"] = 0] = "Fiction";
    Genre[Genre["NonFiction"] = 1] = "NonFiction";
    Genre[Genre["Science"] = 2] = "Science";
    Genre[Genre["History"] = 3] = "History";
    Genre[Genre["Fantasy"] = 4] = "Fantasy";
    Genre[Genre["Mystery"] = 5] = "Mystery";
    Genre[Genre["Romance"] = 6] = "Romance";
    Genre[Genre["Thriller"] = 7] = "Thriller";
})(Genre || (exports.Genre = Genre = {}));
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
    },
    author: {
        type: String,
        required: [true, "Author is required!"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required!"],
        enum: {
            values: Object.values(Genre),
        },
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required!"],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Copies is required!"],
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
bookSchema.methods.updateAvailability = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.available = this.copies > 0;
        yield this.save();
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);

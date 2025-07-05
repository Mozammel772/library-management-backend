import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "./book.controller";

const router = express.Router();

router.post("/create-book", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.patch("/:id", updateBook);
router.delete("/:bookId", deleteBook);

export default router;

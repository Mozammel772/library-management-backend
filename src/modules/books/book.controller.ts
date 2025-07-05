import { Request, Response } from "express";
import { Book } from "./books.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(422).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = 10,
    } = req.query;
    const query: any = {};

    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching books", error });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found", error });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed", error });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Delete failed", error });
  }
};

export { createBook, deleteBook, getBookById, getBooks, updateBook };

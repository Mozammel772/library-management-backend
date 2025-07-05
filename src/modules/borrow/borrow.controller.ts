// import { Request, Response } from "express";
// import { Borrow } from "./borrow.model";

// const borrowBook = async (req: Request, res: Response) => {
//   try {
//     const bookId = req.params.id;
//     const { quantity, dueDate } = req.body;

//     const borrow = await Borrow.create({
//       book: bookId,
//       quantity,
//       dueDate,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Book borrowed successfully",
//       data: borrow,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Borrow failed",
//       error,
//     });
//   }
// };

// const totalBorrowed = async (req: Request, res: Response) => {
//   try {
//     const summary = await Borrow.aggregate([
//       {
//         $group: {
//           _id: "$book",
//           totalQuantity: { $sum: "$quantity" },
//         },
//       },
//       {
//         $lookup: {
//           from: "books",
//           localField: "_id",
//           foreignField: "_id",
//           as: "book",
//         },
//       },
//       { $unwind: "$book" },
//       {
//         $project: {
//           _id: 0,
//           book: {
//             title: "$book.title",
//             isbn: "$book.isbn",
//           },
//           totalQuantity: 1,
//         },
//       },
//     ]);

//     res.json({
//       success: true,
//       message: "Borrowed books summary retrieved successfully",
//       data: summary,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve borrowed summary",
//       error,
//     });
//   }
// };
// export { borrowBook, totalBorrowed };

import { Request, Response } from "express";
import { Book } from "../books/books.model";
import { Borrow } from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ✅ id from route
    const { quantity, dueDate } = req.body;
    console.log("Borrowing book with ID:", id);
    // Check if book exists
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if enough copies are available
    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    // Create borrow entry
    const borrow = await Borrow.create({
      book: id,
      quantity,
      dueDate,
    });
    console.log(borrow);
    // Decrease book copies
    book.copies -= quantity;
    book.available = book.copies > 0;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Borrow failed",
      error,
    });
  }
};

const totalBorrowed = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed summary",
      error,
    });
  }
};

export { borrowBook, totalBorrowed };

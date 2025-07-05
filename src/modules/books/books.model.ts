import { Schema, model } from "mongoose";

export enum Genre {
  "Fiction",
  "NonFiction",
  "Science",
  "History",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
}

const bookSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

export const Book = model("Book", bookSchema);

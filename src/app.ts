import cors from "cors";
import express from "express";
import bookRoutes from "./modules/books/book.route";
import borrowRoutes from "./modules/borrow/borrow.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

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

export default app;

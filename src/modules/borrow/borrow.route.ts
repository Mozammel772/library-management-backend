import express from "express";
import { borrowBook, totalBorrowed } from "./borrow.controller";

const router = express.Router();

router.post("/", borrowBook);
router.get("/", totalBorrowed);

export default router;

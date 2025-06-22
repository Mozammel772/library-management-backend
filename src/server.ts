import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const startServer = async () => {
  try {
    await mongoose.connect(config.database_url!);
    console.log("✅ MongoDB connected successfully");

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
  }
};

startServer();

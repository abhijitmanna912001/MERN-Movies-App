import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import connectDB from "./backend/config/db.js";
import userRoutes from "./backend/routes/userRoutes.js";
import genreRoutes from "./backend/routes/genreRoutes.js";
import moviesRoutes from "./backend/routes/moviesRoutes.js";
import uploadRoutes from "./backend/routes/uploadRoutes.js";

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, ".env") }); // Load root .env

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Serve static uploads
app.use("/uploads", express.static(uploadsPath));

// Frontend static and fallback
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "/frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(frontendPath, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

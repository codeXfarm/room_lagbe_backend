import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import roomRoutes from "./routes/room.route.js";
import blogRoutes from "./routes/blog.route.js";
import categoryRoutes from "./routes/category.route.js";
import bodyParser from "body-parser";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Authentication API
app.use("/api/auth", authRoutes);

app.use("/api/rooms", roomRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port:", PORT);
});

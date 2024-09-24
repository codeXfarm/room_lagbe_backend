import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import roomRoutes from "./routes/room.route.js";
import blogRoutes from "./routes/blog.route.js";
import categoryRoutes from "./routes/category.route.js";
import bookingRoutes from "./routes/booking.route.js";
import usersRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import payments from "./routes/payment.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();

// Use a single CORS configuration
const allowedOrigins = [
  "https://room-lagbe-frontend.vercel.app",
  "https://room-lagbe-six.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS once
app.options("*", cors(corsOptions)); // Handle pre-flight requests

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", payments);
app.use("/api/rooms", roomRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);

// Database connection
const mongodb_uri =
  process.env.ENV !== "dev" ? process.env.MONGODB_URL : process.env.MONGODB_URL;
connectDB(mongodb_uri);

// Start server
app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});

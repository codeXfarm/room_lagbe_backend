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

const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = ["http://localhost:5173"];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsConfig));
app.use(cors(corsOptions));
app.options("*", cors(corsConfig));

app.use(bodyParser.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);


app.use("/api/bookings", bookingRoutes);

app.use("/api/payment", payments);

app.use("/api/rooms", roomRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/category", categoryRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port:", PORT);
});

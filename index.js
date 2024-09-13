import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import roomRoutes from "./routes/room.route.js";
import blogRoutes from "./routes/blog.route.js";
import categoryRoutes from "./routes/category.route.js";
import bodyParser from "body-parser";
import { connectDB } from "./db/connectDB.js";
const app = express();
import cors from 'cors';

dotenv.config();

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

app.use(cors());
app.use(cors(corsConfig));
app.use(cors(corsOptions));
app.options("*", cors(corsConfig));

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Authentication API
app.use("/api/auth", authRoutes);

app.use("/api/rooms", roomRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port:", PORT);
});

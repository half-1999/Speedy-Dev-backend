import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();

// Connect DB
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// Allow JSON + Cookies
app.use(express.json());
app.use(cookieParser());

// ********** CORS FIX **********
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend
  "http://localhost:3000", // Optional
  process.env.FRONTEND_URL, // Production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow mobile apps / Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Allow cookies, tokens
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ********** END CORS FIX **********

app.get("/", (req, res) => {
  res.send("LMS Server is running!");
});

// Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));

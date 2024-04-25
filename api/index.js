import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "../api/routes/user-routes.js";
import authRoute from "../api/routes/auth-router.js";
// import { error } from "console";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "/client/public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.use(express.json());

app.use(cors());

app.use(cookieParser());

const PORT = 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

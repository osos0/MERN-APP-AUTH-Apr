import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

const app = express();

// app.use(express.json());

// app.use(cors());

// app.use(cookieParser());

const PORT = 5000;

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => console.log("Connected to MongoDB"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

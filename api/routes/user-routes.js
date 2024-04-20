import express from "express";
import { test, updateUser } from "../conrollers/users-controller.js";
import { verifyToken } from "../utils/verfiToken.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;

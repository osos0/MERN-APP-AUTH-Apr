import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../conrollers/users-controller.js";
import { verifyToken } from "../utils/verfiToken.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;

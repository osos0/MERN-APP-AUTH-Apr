import exprees from "express";
import Singup from "../conrollers/auth-controller.js";

const router = exprees.Router();

router.post("/", Singup);

export default router;

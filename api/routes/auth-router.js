import exprees from "express";
import { Singup, Singin } from "../conrollers/auth-controller.js";

const router = exprees.Router();

router.post("/signup", Singup);
router.post("/signin", Singin);

export default router;

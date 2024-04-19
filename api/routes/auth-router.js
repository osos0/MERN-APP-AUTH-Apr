import exprees from "express";
import { Singup, Singin, google } from "../conrollers/auth-controller.js";

const router = exprees.Router();

router.post("/signup", Singup);
router.post("/signin", Singin);
router.post("/google", google);

export default router;

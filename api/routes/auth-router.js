import exprees from "express";
import {
  Singup,
  Singin,
  google,
  signOut,
} from "../conrollers/auth-controller.js";

const router = exprees.Router();

router.post("/signup", Singup);
router.post("/signin", Singin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;

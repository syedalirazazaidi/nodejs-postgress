import { Router } from "express";
import { signUpUser, signInUser } from "../controllers/authController";

const router = Router();
router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export default router;

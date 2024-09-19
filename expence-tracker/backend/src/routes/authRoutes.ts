import { Router } from "express";
import { signUpUser, signInUser } from "../controllers/authController";

const router = Router();
router.post("/", signUpUser);
router.post("/", signInUser);

export default router;

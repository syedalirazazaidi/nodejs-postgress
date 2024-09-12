import { Router } from "express";
import {
  createCategories,
  getCategories,
} from "../controllers/categoryController";

const router = Router();
router.get("/", getCategories);
router.post("/", createCategories);

export default router;

import { Request, Response } from "express";
import pool from "../config/db";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error :" });
  }
};

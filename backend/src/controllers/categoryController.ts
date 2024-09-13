import { Request, Response } from "express";
import pool from "../config/db";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM alicategories ORDER BY category_id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error :" });
  }
};

export const createCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO alicategories (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

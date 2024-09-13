import { Request, Response } from "express";
import pool from "../config/db";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rows } = await pool.query(`
        SELECT json_agg(
          json_build_object(
            'category_id', c.category_id,
            'category_name', c.category_name,
            'aliproducts', (
              SELECT json_agg(
                json_build_object(
                  'product_id', p.product_id,
                  'product_name', p.product_name
                )
              )
              FROM aliproducts p
              WHERE p.category_id = c.category_id
            )
          )
        ) AS categories_with_products
        FROM alicategories c;
      `);

    res.json(rows[0].categories_with_products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error :" });
  }
};


export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { product_name, category_id } = req.body;

  try {
    const { rows } = await pool.query(
      `
      INSERT INTO aliproducts (product_name, category_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [product_name, category_id]
    );

    res.status(201).json({ message: 'Product created successfully', product: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

import { Request, Response } from "express";
import pool from "../config/db";

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error :" });
  }
};

// Create a new todo
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title } = req.body;

  // Validate request body
  if (typeof title === 'undefined') {
    return res.status(400).json({ error: "Missing 'title' in request body" });
  }

  try {
    const result = await pool.query(
      "UPDATE todos SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error:any) {
    console.error('Database error:', error); // Log more details
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
// export const updateTodo = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const { completed,title } = req.body;
//   try {
//     const result = await pool.query(
//       "UPDATE todos SET completed = $1, title = $2 WHERE id = $3 RETURNING *",
//       [completed, id,title]
//     );
//     if (result.rows.length === 0) {
//       res.status(404).json({ error: "Todo not found" });
//       return;
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Database error" });
//   }
// };

// Delete a todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

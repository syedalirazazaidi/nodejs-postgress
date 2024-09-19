import pool from "../config/db";
import bcrypt from "bcrypt";
import { promises } from "dns";
import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

// PostgreSQL connection pool

// Sign up user controller
export const signUpUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Check if user already exists
      const userCheckQuery = "SELECT * FROM users WHERE email = $1";
      const existingUser = await pool.query(userCheckQuery, [email]);

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertUserQuery = `
      INSERT INTO users (email, password)
      VALUES ($1, $2) RETURNING *;
    `;
      const newUser = await pool.query(insertUserQuery, [
        email,
        hashedPassword,
      ]);

      res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0],
      });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const signInUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

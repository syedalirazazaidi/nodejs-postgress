import pool from "../config/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Sign up user controller

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
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
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = existingUser.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload data
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry (adjust as needed)
    );

    res.status(200).json({
      message: "Login successful",
      token, // JWT token
      user: { id: user.id, email: user.email }, // Optional: user data for client-side use
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

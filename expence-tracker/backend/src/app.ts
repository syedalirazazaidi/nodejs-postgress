import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import cors from 'cors'; 
const app = express();
// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow req
app.use(bodyParser.json());
app.use("/api/", authRoutes);
// app.use("/api/", authRoutes);

export default app;

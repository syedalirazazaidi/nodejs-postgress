import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
const app = express();
app.use(bodyParser.json());
app.use("/api/signup", authRoutes);

export default app;

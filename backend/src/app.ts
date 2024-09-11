import express from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos";
import categoriesRoute from "./routes/categoryRoute";

const app = express();
app.use(bodyParser.json());

app.use("/api/todos", todosRoutes);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", require("./routes/productRoute"));

export default app;

import express from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos";
import categoriesRoute from "./routes/categoryRoute";
import productsRoute from "./routes/productRoute";

const app = express();
app.use(bodyParser.json());

app.use("/api/todos", todosRoutes);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productsRoute);

export default app;

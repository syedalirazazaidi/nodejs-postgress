"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = __importDefault(require("./routes/todos"));
const categories_1 = __importDefault(require("./routes/categoryRoute"));
const products_1 = __importDefault(require("./routes/productRoute"));

const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api/todos", todos_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/products", products_1.default);

exports.default = app;

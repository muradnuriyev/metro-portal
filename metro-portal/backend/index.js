const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");
const categoriesRoutes = require("./routes/categories");

const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Авторизация
app.use("/auth", authRoutes);

// Защищённые маршруты
app.use("/articles", authMiddleware, articlesRoutes);
app.use("/categories", authMiddleware, categoriesRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

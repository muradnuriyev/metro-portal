const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const categoriesRoutes = require('./routes/categories');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

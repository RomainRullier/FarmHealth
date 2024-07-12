const express = require('express');
const sequelize = require('./models').sequelize;

const app = express();

// Sync Sequelize models
sequelize.sync();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/predict', require('./routes/predict'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
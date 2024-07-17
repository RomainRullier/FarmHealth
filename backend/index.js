const express = require('express');
const cors = require('cors');
const sequelize = require('./models').sequelize;
const path = require('path');

const app = express();

// Sync Sequelize models
sequelize.sync();

app.use(cors()); // Utiliser CORS pour toutes les routes
app.use(express.json({ extended: false }));

// Servir les fichiers statics
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/predict', require('./routes/predict'));
app.use('/validate', require('./routes/validate'));
app.use('/history', require('./routes/history'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
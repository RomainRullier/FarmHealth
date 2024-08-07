const express = require('express');
const cors = require('cors');
const sequelize = require('./models').sequelize;
const path = require('path');
const authMiddleware = require('./middleware/auth');

require('dotenv').config({
  path: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.development',
});
console.log('PREDICTION_SERVICE_URL:', process.env.PREDICTION_SERVICE_URL); // Ajoutez cette ligne pour vérifier la valeur


const app = express();

// Sync Sequelize models
sequelize.sync();

app.use(cors()); // Utiliser CORS pour toutes les routes
app.use(express.json({ extended: false }));

// Servir les fichiers statics
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/predict', authMiddleware, require('./routes/predict'));
app.use('/validate', authMiddleware, require('./routes/validate'));
app.use('/history', authMiddleware, require('./routes/history'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
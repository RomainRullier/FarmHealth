const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { PlantAnalysis } = require('../models');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(`${process.env.PREDICTION_SERVICE_URL}/predict`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const { plant_type, condition } = response.data;
    const imageFilename = `${Date.now()}_${req.file.originalname}`;
    const imagePath = path.join(__dirname, '..', 'uploads', imageFilename);

    // Sauvegarder l'image localement
    fs.writeFileSync(imagePath, req.file.buffer);

    const image_url = `/uploads/${imageFilename}`;

    // Obtenir user_id à partir du token JWT
    const user_id = req.user.userId;

    // Enregistrer l'analyse dans la base de données
    const analysis = await PlantAnalysis.create({
      plant_type: plant_type,
      condition: condition,
      image_url: image_url,
      user_id: user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      treatment_validated: false // Par défaut, non validé
    });

    res.json({ analysis, prediction: response.data });
  } catch (error) {
    console.error('Error in /predict route:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
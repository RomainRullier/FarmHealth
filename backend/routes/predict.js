const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { PlantAnalysis } = require('../models');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post('http://192.168.1.164:5001/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const { plant_type, condition } = response.data;

    // Assumer que user_id est fourni dans la requête (à adapter selon votre logique)
    const user_id = req.body.user_id;

    // Enregistrer l'analyse dans la base de données
    const analysis = await PlantAnalysis.create({
      plant_type: plant_type,
      condition: condition,
      image_url: 'path/to/image', // Stockez l'URL de l'image si nécessaire
      user_id: user_id,
      timestamp: new Date(),
      treatment_validated: false // Par défaut, non validé
    });

    res.json({ analysis, prediction: response.data });
  } catch (error) {
    console.error('Error in /predict route:', error.message); // Log the error
    res.status(500).send(error.message);
  }
});

module.exports = router;
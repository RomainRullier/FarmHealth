const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { PlantAnalysis } = require('../models');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Save the image locally
    const filename = `${Date.now()}_${req.file.originalname}`;
    const filepath = path.join(__dirname, '../uploads/', filename);
    fs.writeFileSync(filepath, req.file.buffer);

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

    // Assume user_id is provided in the request (adjust according to your logic)
    const user_id = req.body.user_id;

    // Save analysis to database with the local image path
    const analysis = await PlantAnalysis.create({
      plant_type: plant_type,
      condition: condition,
      image_url: `/uploads/${filename}`, // Store the relative path to the image
      user_id: user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      treatment_validated: false // Default to not validated
    });

    res.json({ analysis, prediction: response.data });
  } catch (error) {
    console.error('Error in /predict route:', error.message); // Log the error
    res.status(500).send(error.message);
  }
});

module.exports = router;
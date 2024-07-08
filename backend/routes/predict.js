const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

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
    res.json(response.data);
  } catch (error) {
    console.error('Error in /predict route:', error.message); // Log the error
    res.status(500).send(error.message);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('image'), async (req, res) => {
  try {
    const formData = new FormData();
    req.files.forEach((file, index) => {
      formData.append('files', file.buffer, file.originalname);
    });

    const response = await axios.post('http://localhost:5001/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
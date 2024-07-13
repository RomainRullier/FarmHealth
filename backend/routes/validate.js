const express = require('express');
const router = express.Router();
const { PlantAnalysis } = require('../models');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { treatment_validated } = req.body;

    const analysis = await PlantAnalysis.findByPk(id);
    if (!analysis) {
      return res.status(404).send('Analysis not found.');
    }

    analysis.treatment_validated = treatment_validated;
    await analysis.save();

    res.json(analysis);
  } catch (error) {
    console.error('Error in /validate route:', error.message); // Log the error
    res.status(500).send(error.message);
  }
});

module.exports = router;
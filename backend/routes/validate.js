const express = require('express');
const router = express.Router();
const { PlantAnalysis } = require('../models');
const axios = require('axios');

router.post('/:id', async (req, res) => {
  try {
    const analysis = await PlantAnalysis.findByPk(req.params.id);
    if (!analysis) {
      return res.status(404).send('Analysis not found');
    }

    analysis.treatment_validated = req.body.treatment_validated;
    await analysis.save();

    // Envoyer les données au serveur Raspberry Pi
    const { user_id, plant_type, condition } = analysis;
    await axios.post('http://localhost:5001/apply-treatment', {
      userId: user_id,
      analysisId: analysis.id,
      plantType: plant_type,
      condition: condition
    });

    res.send('Traitement validé et envoyé au Raspberry Pi');
  } catch (error) {
    console.error('Error in /validate route:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
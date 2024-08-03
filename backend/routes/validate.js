const express = require('express');
const router = express.Router();
const { PlantAnalysis } = require('../models');
const axios = require('axios');

// const predictionServiceUrl = process.env.PREDICTION_SERVICE_URL;

router.post('/:id', async (req, res) => {
  try {
    const analysis = await PlantAnalysis.findByPk(req.params.id);
    if (!analysis) {
      return res.status(404).send('Analysis not found');
    }

    analysis.treatment_validated = req.body.treatment_validated;
    await analysis.save();

    // Envoyer les données au serveur de prédiction
    const { user_id, plant_type, condition } = analysis;
    // await axios.post(`${predictionServiceUrl}/apply-treatment`, {
    //   userId: user_id,
    //   analysisId: analysis.id,
    //   plantType: plant_type,
    //   condition: condition
    // });

    console.log('Données à envoyer pour le traitement :', {
      userId: user_id,
      analysisId: analysis.id,
      plantType: plant_type,
      condition: condition
    });

    res.send('Traitement validé et envoyé au serveur de prédiction');
  } catch (error) {
    console.error('Error in /validate route:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
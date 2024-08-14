const express = require('express');
const router = express.Router();
const { PlantAnalysis } = require('../models');

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const analyses = await PlantAnalysis.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']],
    });

    res.json(analyses);
  } catch (error) {
    console.error('Error in /history route:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
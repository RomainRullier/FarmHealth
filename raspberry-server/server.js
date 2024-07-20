const express = require('express');
const app = express();
const port = 5001; // Port sur lequel écoutera l'API du Raspberry Pi

app.use(express.json());

app.post('/apply-treatment', (req, res) => {
  const { userId, analysisId, plantType, condition } = req.body;
  console.log(`Received treatment validation:
    User ID: ${userId}
    Analysis ID: ${analysisId}
    Plant Type: ${plantType}
    Condition: ${condition}`);
  // Simuler ici l'application du traitement par le Raspberry Pi.
  res.send('Traitement reçu et appliqué');
});

app.listen(port, () => {
  console.log(`Raspberry Pi server running at http://localhost:${port}`);
});
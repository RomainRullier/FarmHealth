const express = require('express');
const cors = require('cors');
const predictRoute = require('./routes/predict');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/predict', predictRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
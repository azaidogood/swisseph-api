const express = require('express');
const path = require('path');
const swe = require('sweph');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the path to the ephemeris data
const ephemerisPath = path.join(__dirname, 'ephemeris');
swe.set_ephe_path(ephemerisPath);

app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

app.get('/sun', (req, res) => {
  const jd = swe.julday(2025, 5, 21, 12.0);
  const result = swe.calc_ut(jd, swe.SE_SUN);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});


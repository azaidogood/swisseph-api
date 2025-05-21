const express = require('express');
const swe = require('swisseph');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Required to load ephemeris files, even if empty dir
swe.set_ephe_path(path.join(__dirname, 'ephemeris'));

// Root route to verify app is live
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running!');
});

// Test Swiss Ephemeris: get Sun's position
app.get('/sun', (req, res) => {
  const jd = swe.swe_julday(2025, 5, 21, 12.0, swe.SE_GREG_CAL);
  const result = swe.swe_calc_ut(jd, swe.SE_SUN, swe.SEFLG_SPEED);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const express = require('express');
const path = require('path');
const swe = require('swisseph');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the path to the ephemeris data (you MUST have at least one .se1 file in this folder)
swe.set_ephe_path(path.join(__dirname, 'ephemeris'));

// Root test route
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is live!');
});

// Calculate Sun position for a fixed date (you can make this dynamic)
app.get('/sun', (req, res) => {
  const jd = swe.swe_julday(2025, 5, 21, 12.0, swe.SE_GREG_CAL);
  const result = swe.swe_calc_ut(jd, swe.SE_SUN, swe.SEFLG_SPEED);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


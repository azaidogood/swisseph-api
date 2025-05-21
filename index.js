const express = require('express');
const swe = require('swisseph');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// point to your local ephemeris folder
swe.swe_set_ephe_path(path.join(__dirname, 'ephemeris'));

app.get('/sun', (req, res) => {
  const jd = swe.swe_julday(2025, 5, 21, 14.5, swe.SE_GREG_CAL);
  const result = swe.swe_calc_ut(jd, swe.SE_SUN, swe.SEFLG_SPEED);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


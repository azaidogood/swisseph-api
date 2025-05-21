const express = require('express');
const swe = require('swisseph');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

swe.swe_set_ephe_path(path.join(__dirname, 'ephemeris'));

app.get('/', (req, res) => {
  const jd = swe.swe_julday(2025, 5, 21, 0, swe.SE_GREG_CAL);
  const result = swe.swe_calc_ut(jd, swe.SE_SUN, 0);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Swisseph API running on port ${PORT}`);
});

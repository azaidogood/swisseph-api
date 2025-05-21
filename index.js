const express = require('express');
const path = require('path');
const swe = require('swisseph');

const app = express();
const PORT = process.env.PORT || 3000;

// This *must* exist
const ephemerisPath = path.join(__dirname, 'ephemeris');
swe.set_ephe_path(ephemerisPath);

// Test root route
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

// Sun position endpoint
app.get('/sun', (req, res) => {
  const jd = swe.swe_julday(2025, 5, 21, 12.0, swe.SE_GREG_CAL);
  swe.swe_calc_ut(jd, swe.SE_SUN, swe.SEFLG_SPEED, (result) => {
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});


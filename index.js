const express = require('express');
const path = require('path');
const swe = require('sweph');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Set the path to ephemeris data
swe.set_ephe_path(path.join(__dirname, 'ephemeris'));

// Planet constant map
const planetMap = {
  SE_SUN: swe.SE_SUN,
  SE_MOON: swe.SE_MOON,
  SE_MERCURY: swe.SE_MERCURY,
  SE_VENUS: swe.SE_VENUS,
  SE_MARS: swe.SE_MARS,
  SE_JUPITER: swe.SE_JUPITER,
  SE_SATURN: swe.SE_SATURN,
  SE_URANUS: swe.SE_URANUS,
  SE_NEPTUNE: swe.SE_NEPTUNE,
  SE_PLUTO: swe.SE_PLUTO
};

// Root check
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

// Dynamic planet calculator
app.post('/planet', (req, res) => {
  const { year, month, day, hour, planet } = req.body;

  if (!year || !month || !day || hour === undefined || !planet) {
    return res.status(400).json({ error: 'Missing parameters. Required: year, month, day, hour, planet' });
  }

  const planetConst = planetMap[planet];
  if (planetConst === undefined) {
    return res.status(400).json({ error: `Unknown planet key: ${planet}` });
  }

  const jd = swe.julday(year, month, day, hour);
  const result = swe.calc_ut(jd, planetConst);
  res.json({ jd, planet, result });
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

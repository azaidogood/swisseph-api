const express = require('express');
const path = require('path');
const swe = require('sweph');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Set path to ephemeris data
const ephemerisPath = path.join(__dirname, 'ephemeris');
if (swe.set_ephe_path) {
  swe.set_ephe_path(ephemerisPath);
}

// Root check
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

// Auto-calculate current sun position
app.get('/sun', (req, res) => {
  const now = new Date();
  const jd = swe.julday(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    now.getUTCHours() + now.getUTCMinutes() / 60
  );

  const result = swe.calc_ut(jd, swe.SE_SUN);
  res.json({
    planet: 'Sun',
    julianDay: jd,
    ...result
  });
});

// POST endpoint to calculate any planet
app.post('/planet', (req, res) => {
  const { year, month, day, hour = 12.0, planet = 'SE_SUN' } = req.body;

  if (!swe[planet]) {
    return res.status(400).json({ error: `Unknown planet key: ${planet}` });
  }

  const jd = swe.julday(year, month, day, hour);
  const result = swe.calc_ut(jd, swe[planet]);

  res.json({
    planet,
    julianDay: jd,
    ...result
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Swiss Ephemeris API listening on port ${PORT}`);
});


const express = require('express');
const path = require('path');
const swe = require('sweph');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to ephemeris files
const ephemerisPath = path.join(__dirname, 'ephemeris');
swe.set_ephe_path(ephemerisPath);

// Root check
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

// Get current Sun position
app.get('/sun', (req, res) => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1; // JS months are 0-based
  const day = now.getUTCDate();
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;

  const jd = swe.julday(year, month, day, hour);
  const sun = swe.calc_ut(jd, swe.SE_SUN);

  res.json({
    datetime: now.toISOString(),
    julianDay: jd,
    planet: "Sun",
    ...sun
  });
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

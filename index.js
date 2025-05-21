const express = require('express');
const path = require('path');
const swe = require('sweph');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON
app.use(express.json());

// Set Swiss Ephemeris path
const ephemerisPath = path.join(__dirname, 'ephemeris');
swe.set_ephe_path(ephemerisPath);

// Root route for check
app.get('/', (req, res) => {
  res.send('🟢 Swiss Ephemeris API is running');
});

// Dynamic planet route
app.post('/planet', (req, res) => {
  const { year, month, day, hour, planet } = req.body;

  if (
    typeof year !== 'number' ||
    typeof month !== 'number' ||
    typeof day !== 'number' ||
    typeof hour !== 'number' ||
    typeof planet !== 'number'
  ) {
    return res.status(400).json({ error: 'Missing or invalid parameters. Required: year, month, day, hour, planet' });
  }

  const jd = swe.julday(year, month, day, hour);
  const result = swe.calc_ut(jd, planet);
  res.json({ julianDay: jd, result });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

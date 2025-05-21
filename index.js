const express = require('express');
const swe = require('swisseph');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set path to ephemeris files
swe.initialize({
eph_path: path.join(__dirname, 'ephemeris')
});

app.get('/astro', (req, res) => {
const date = new Date('2025-12-20T00:00:00Z');

swe.calc_ut(
date.getTime() / 86400000 + 2440587.5, // Convert to Julian date
swe.SUN,
(flag = swe.FLG_SWIEPH),
(result) => {
if (result.rc !== swe.OK) {
res.status(500).send('Calculation error');
} else {
res.json({
longitude: result.longitude,
latitude: result.latitude,
});
}
}
);
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

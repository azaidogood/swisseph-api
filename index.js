const express = require('express');
const path = require('path');
const swe = require('swisseph');

const app = express();
const port = process.env.PORT || 3000;

const ephePath = path.join(__dirname, 'ephemeris');
swe.swe_set_ephe_path(ephePath);

app.get('/chart', (req, res) => {
const dateStr = req.query.date || new Date().toISOString().split('T')[0];
const [year, month, day] = dateStr.split('-').map(Number);

swe.swe_utc_to_jd(year, month, day, 12, 0, 0, swe.SE_GREG_CAL, (julian) => {
swe.swe_calc_ut(julian.jd, swe.SE_SUN, (result) => {
res.json({ jd: julian.jd, sun: result });
});
});
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

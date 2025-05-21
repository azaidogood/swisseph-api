const express = require('express');
const swe = require('swisseph');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

swe.set_ephe_path(path.join(__dirname, 'ephemeris'));

app.get('/chart', (req, res) => {
const date = new Date(req.query.date || new Date());

swe.utc_to_jd(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(),
date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), (julian) => {
swe.calc_ut(julian.jd, swe.SUN, (result) => {
res.json({ jd: julian.jd, sun: result });
});
});
});

app.listen(port, () => {
console.log(`Listening on port ${port}`);
});

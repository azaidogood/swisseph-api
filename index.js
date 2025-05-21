const express = require('express');
const swe = require('swisseph');
const app = express();

swe.set_ephe_path(__dirname + '/ephemeris');

app.get('/astro', (req, res) => {
const { date } = req.query;
if (!date) return res.status(400).json({ error: 'Missing date' });

const [year, month, day] = date.split('-').map(Number);
const jd = swe.swe_julday(year, month, day, 0, swe.GREG_CAL);

const planets = [swe.SE_SUN, swe.SE_MOON, swe.SE_MERCURY];
const results = {};

for (const planet of planets) {
const calc = swe.swe_calc_ut(jd, planet);
results[swe.get_planet_name(planet)] = {
longitude: calc.longitude
};
}

res.json({ julianDay: jd, planets: results });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));

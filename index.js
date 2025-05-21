const express = require('express');
const app = express();
const swe = require('swisseph'); // assuming you installed this
const path = require('path');

// Set Swiss Ephemeris data path (optional if not using ephemeris files)
swe.set_ephe_path(path.join(__dirname, 'ephemeris'));

// Define a root route
app.get('/', (req, res) => {
res.json({ message: 'Swiss Ephemeris API is running.' });
});

// Example endpoint: calculate Julian day for a date
app.get('/julian', (req, res) => {
const jd = swe.julday(2025, 5, 21, 0); // May 21, 2025, at 0h UTC
res.json({ julianDay: jd });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});

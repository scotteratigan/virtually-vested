const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const CircularJSON = require('circular-json');

// API Routes
router.use('/api', apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  console.log('api/index.js: req:', CircularJSON.stringify(req.params));
  console.log('No defined routes hit, sending index.');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;

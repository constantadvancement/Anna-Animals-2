const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files from the Angular or React build directory
router.use(express.static(path.join(__dirname, '../dist/client-side-app/browser')));

// // Handle other routes and serve index.html for Angular routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/client-side-app/browser/index.html'));

// });

module.exports = router;

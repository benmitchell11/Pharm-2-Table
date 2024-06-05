const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { admin, createUserApp } = require('./admin');
const routes = require('./routes');

const app = express();
const PORT = 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
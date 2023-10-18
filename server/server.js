const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a test endpoint.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

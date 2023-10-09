const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed

// Serve static files (e.g., HTML, CSS, JS) from a directory named "public"
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

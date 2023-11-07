const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5500;

app.use(express.static('content'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'search.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'list.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

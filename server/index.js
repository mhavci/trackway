const express = require('express');
const axios = require('axios');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.listen(port, () => {
    console.log('server started on port 3000');
});

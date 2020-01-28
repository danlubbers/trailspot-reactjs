const express = require('express');
const config = require('./config.js');
const app = express();
const { PORT } = config;

app.use(express.static(__dirname+'/../build'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
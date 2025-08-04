const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '..', '.env')});

const apiPort = process.env.API_PORT;

app.listen(apiPort, () => {
    console.log(`Local: 🚀 API is running at http://localhost:${apiPort}`)
});
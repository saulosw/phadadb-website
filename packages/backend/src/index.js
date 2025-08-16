const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '..', '.env')});

const apiPort = process.env.API_PORT;
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend server working!');
});

app.listen(apiPort, () => {
    console.log(`Local: 🚀 API is running at http://localhost:${ apiPort }`);
});
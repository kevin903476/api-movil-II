// filepath: c:\Users\wendy\OneDrive - Universidad Técnica Nacional\ProjectMobilesII\api-movil-II\app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes'); 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/items', itemRoutes);
app.use('/users', userRoutes); 

module.exports = app;
const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

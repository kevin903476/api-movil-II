const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Importar rutas
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta de prueba para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
});

// Usar rutas
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
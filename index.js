const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const process = require('process');

const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationsRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const deductionRoutes = require('./routes/deductionRoutes');
const coursesRouter = require('./routes/coursesRoutes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
});


app.use('/users', userRoutes);
app.use('/notifications', notificationRoutes);
app.use('/catalogs', catalogRoutes);
app.use('/payments', paymentRoutes);
app.use('/deductions', deductionRoutes);
app.use('/courses', coursesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
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
const tutorialsRoutes = require('./routes/tutorialsRoutes');
const couponRoutes = require('./routes/couponRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const testRoutes = require('./routes/testRoutes');
const path = require('path');

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://192.168.101.7:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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
app.use('/tutorials', tutorialsRoutes);
app.use('/coupons', couponRoutes);
app.use('/reviews', reviewRoutes);
app.use('/test', testRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
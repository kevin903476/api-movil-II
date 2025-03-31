//@ts-check
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validatePaymentOfStudent } = require('../middleware/validator');

router.post('/insertPaymentOfStudent', auth, checkRole([1, 2]), validatePaymentOfStudent, paymentController.insertPaymentOfStudent);

module.exports = router;
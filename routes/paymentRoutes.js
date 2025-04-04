//@ts-check
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validatePaymentOfStudent } = require('../middleware/validator');

router.post('/insertPaymentOfStudent', auth, checkRole([1, 2]), validatePaymentOfStudent, paymentController.insertPaymentOfStudent);
router.post('/confirmPaymentOfStudent', auth, checkRole([1, 3]), paymentController.confirmPaymentOfStudent);

router.post('/pendingPaymentsProfessor', auth, checkRole([1, 3]), paymentController.pendingPaymentsProfessor);
router.post('/getPaymentsProfessor', auth, checkRole([1, 3]), paymentController.getPaymentsProfessor);


router.post('/pendingPaymentsStudent', auth, checkRole([1, 2]), paymentController.pendingPaymentsStudent);
router.get('/getPaymentDetails', auth, checkRole([1, 3]), paymentController.getPaymentDetails);
router.get('/getPendingPaymentsStudentsTeacher', auth, checkRole([1, 3]), paymentController.getPendingPaymentsStudentsTeacher);
module.exports = router;
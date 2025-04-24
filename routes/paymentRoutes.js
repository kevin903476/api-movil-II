//@ts-check
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validatePaymentOfStudent } = require('../middleware/validator');

router.put('/updatePaymentOfStudent',  auth, checkRole([1, 2]), upload.single('comprobante'), validatePaymentOfStudent, paymentController.updatePaymentOfStudent); //Realmente no inserta sino que actualiza el pago del estudiante
router.post('/confirmPaymentOfStudent', auth, checkRole([1, 3]), paymentController.confirmPaymentOfStudent);

router.get('/pendingPaymentsProfessor', auth, checkRole([1, 3]), paymentController.pendingPaymentsProfessor);
router.get('/getPaymentsProfessor', auth, checkRole([1, 3]), paymentController.getPaymentsProfessor);


router.get('/pendingPaymentsStudent', auth, checkRole([1, 2]), paymentController.pendingPaymentsStudent);

router.get('/getPaymentDetails', auth, checkRole([1, 3]), paymentController.getPaymentDetails);
router.get('/getPendingPaymentsStudentsTeacher', auth, checkRole([1, 3]), paymentController.getPendingPaymentsStudentsTeacher);

module.exports = router;
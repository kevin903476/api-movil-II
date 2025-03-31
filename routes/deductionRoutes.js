//@ts-check
const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deductionController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getBillsProfessor', auth, checkRole([1, 3]), deductionController.getBillProfessor);
router.get('/getDetailsBillProfessor', auth, checkRole([1, 3]), deductionController.getDetailsBillProfesssor);
router.get('/getTotalNetInvoicesTeacher', auth, checkRole([1, 3]), deductionController.getTotalNetInvoicesTeacher);
router.post('/payMultipleDeductions', auth, checkRole([1, 3]), deductionController.payMultipleDeductions);
router.get('/getDeductionProfessor', auth, checkRole([1, 3]), deductionController.getDeductionProfessor);
module.exports = router;


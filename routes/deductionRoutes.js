//@ts-check
const express = require('express');
const router = express.Router();
const deductionController = require('../controllers/deductionController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getBillsProfessor', auth, checkRole([1, 2]), deductionController.getBillProfessor);
router.get('/getDetailsBillProfessor', auth, checkRole([1, 2]), deductionController.getDetailsBillProfesssor);
router.get('/getBillStudent', auth, checkRole([1, 2]), deductionController.getTotalNetInvoicesTeacher);

module.exports = router;


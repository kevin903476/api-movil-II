//@ts-check
const express = require('express');
const router = express.Router();
const tutorialsController = require('../controllers/tutorialsController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getTutorials', auth,checkRole([1,2,3]), tutorialsController.getTutorials );
router.post('/scheduleTutoring', auth, checkRole([1, 2]), tutorialsController.scheduleTutoring );



module.exports = router;
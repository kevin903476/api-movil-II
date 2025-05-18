//@ts-check
const express = require('express');
const router = express.Router();
const tutorialsController = require('../controllers/tutorialsController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const pagination = require('../middleware/pagination');

router.get('/getTutorials', auth, checkRole([1, 2, 3]), pagination, tutorialsController.getTutorials);
router.post('/getPendingTutorialProfessor', auth, checkRole([1, 2, 3]), tutorialsController.getPendingTutorialProfessor);

router.post('/getTutorialsProfessorCourse', auth, checkRole([1, 3]), tutorialsController.getTutorialsProfessorCourse);
router.get('/getScheduledTutorials', auth, checkRole([1, 2, 3]), tutorialsController.getScheduledTutorials);
router.post('/scheduleTutoring', auth, checkRole([1, 2]), tutorialsController.scheduleTutoring);
router.get('/getPendingTutorialsProfessor', auth, checkRole([1, 2, 3]), tutorialsController.getPendingTutorialsProfessor);
router.post('/cancelTutorial', auth, checkRole([1, 2, 3]), tutorialsController.cancelTutorial);



module.exports = router;
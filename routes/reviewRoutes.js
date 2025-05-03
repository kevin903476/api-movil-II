//@ts-check
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/reviewTutorialFinished', auth, checkRole([2]), reviewController.getTutorialFinishedReview);
router.post('/insertReview', auth, checkRole([2]), reviewController.insertReview);
router.get('/getReviewByProfesorId/:profesorId', auth, checkRole([1, 2, 3]), reviewController.getReviewByProfesorId);


module.exports = router;
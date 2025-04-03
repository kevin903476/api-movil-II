//@ts-check
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/reviewTutorialFinished', auth, checkRole(['estudiante']), reviewController.getTutorialFinishedReview);



module.exports = router;
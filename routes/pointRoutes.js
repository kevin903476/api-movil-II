//@ts-check
const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getPoints', auth, checkRole([3]), pointController.getPoints);

module.exports = router;
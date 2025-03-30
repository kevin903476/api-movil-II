const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

router.post('/register-token', auth, notificationController.registerPushToken);

router.post('/send', auth, notificationController.sendNotification);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userRegisterController');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/registerEstudiante', userController.registerEstudiante);
router.post('/login', userController.login);
module.exports = router;
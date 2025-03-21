const express = require('express');
const router = express.Router();
const userController = require('../controllers/userRegisterController');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/registerEstudiante', userController.registerEstudiante);
router.post('/registerProfesor', userController.registerProfesor);
router.post('/login', userController.loginUser);
module.exports = router;
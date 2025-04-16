//@ts-check
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validateRegisterEstudiante } = require('../middleware/validator');
router.get('/getAllUsers', userController.getAllUsers);
router.post('/verifyExistingEmail', userController.verifyExistingEmail);
router.post('/registerStudent', validateRegisterEstudiante, userController.registerEstudiante);
router.post('/registerProfesor', userController.registerProfesor);
router.put('/updateProfesor', upload.single('foto'), auth, checkRole([1, 3]), userController.updateProfesor);
router.put('/updateStudent', auth, checkRole([1, 2]), userController.updateStudent);
router.get('/getProfileStudent', auth, checkRole([1, 2]), userController.getProfileStudent);
router.post('/login', userController.loginUser);
router.get('/getProfileProfesor', auth, checkRole([1, 3]), userController.getProfileProfesor);
module.exports = router;
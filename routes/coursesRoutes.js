//@ts-check
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getCourses', auth,checkRole([1,2,3]), coursesController.getCourses );
router.post('/createCourse', auth, checkRole([1, 3]), coursesController.createCourse );

// logica para agregar un profe a un curso

router.post('/insertCourseScheduleProfessor', auth, checkRole([1, 3]), coursesController.insertCourseScheduleProfessor );
router.get('/searchCourses', auth, checkRole([1, 2, 3]), coursesController.searchCourses);

module.exports = router;
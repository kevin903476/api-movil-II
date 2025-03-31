//@ts-check
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/getCourses', coursesController.getCourses );
router.post('/createCourse', coursesController.createCourse );

// logica para agregar un profe a un curso

router.post('/insertCourseScheduleProfessor', coursesController.insertCourseScheduleProfessor );


module.exports = router;
//@ts-check
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/getCourses', coursesController.getCourses );
router.get('/createCourse', coursesController.createCourse );

// logica para agregar un profe a un curso

router.get('/insertCourseScheduleProfessor', coursesController.insertCourseScheduleProfessor );


module.exports = router;
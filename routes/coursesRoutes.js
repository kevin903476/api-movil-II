//@ts-check
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/getCourses', auth,checkRole([1,2,3]), coursesController.getCourses );
router.post('/createCourse', auth, checkRole([1, 3]), coursesController.createCourse );

router.get('/getCoursesProfesor', auth,checkRole([1,3]), coursesController.getCoursesProfessor );

router.post('/insertCourseScheduleProfessor', auth, checkRole([1, 3]), coursesController.insertCourseScheduleProfessor );
router.get('/searchCourses', auth, checkRole([1, 2, 3]), coursesController.searchCourses);
router.delete('/deleteCourse', auth , checkRole([1, 3]), coursesController.logicalDeleteCourse);
router.delete('/deleteCourseProfessor', auth , checkRole([1, 3]), coursesController.deleteCourseProfessor);
router.put('/updateCourseProfessor', auth , checkRole([1, 3]), coursesController.updateCourseProfessor);
router.put('/updateCourseAdmin', auth , checkRole([1, 3]), coursesController.updateCourseAdmin);
module.exports = router;
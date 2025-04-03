//@ts-check
const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catologosController');

//rutas publicas para el frontend con autenticacion
router.get('/universities', catalogController.getCatalogUniversity);
router.get('/headquarters', catalogController.getCatalogHeadquarters);
router.get('/courses', catalogController.getCatalogCourse);
router.get('/careers', catalogController.getCatalogCareer);
router.get('/roles',  catalogController.getCatalogRoles);
router.get('/roles',  catalogController.getCatalogRoles);
router.get('/enclosures',  catalogController.getCatalogEnclosure);
router.get('/coupons', catalogController.getCatalogCoupons);
router.get('/universitiesWithAllInfo', catalogController.getUniversitiesWithAllInfo);
router.get('/classificationCourses', catalogController.getClassificationCourses);

module.exports = router;
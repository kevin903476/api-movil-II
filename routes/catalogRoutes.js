//@ts-check
const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catologosController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

//rutas publicas para el frontend sin autenticacion
router.get('/universities', catalogController.getCatalogUniversity);
router.get('/courses', catalogController.getCatalogCourse);
router.get('/headquarters', catalogController.getCatalogHeadquarters);
router.get('/careers', catalogController.getCatalogCareer);
router.get('/roles', catalogController.getCatalogRoles);
router.get('/enclosures', catalogController.getCatalogEnclosure);
router.get('/coupons', catalogController.getCatalogCoupons);
router.get('/universitiesWithAllInfo', auth, checkRole([1, 2, 3]), catalogController.getUniversitiesWithAllInfo);

module.exports = router;
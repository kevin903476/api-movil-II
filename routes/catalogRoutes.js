//@ts-check
const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catologosController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

//rutas publicas para el frontend sin autenticacion
router.get('/universities', catalogController.getCatalogUniversity);
router.get('/courses', auth,checkRole([1,2,3]) ,catalogController.getCatalogCourse);
router.get('/headquarters', catalogController.getCatalogHeadquarters);
router.get('/careers',  auth,checkRole([1,2,3]), catalogController.getCatalogCareer);
router.get('/roles', auth,checkRole([1,2,3]), catalogController.getCatalogRoles);
router.get('/roles', auth,checkRole([1,2,3]), catalogController.getCatalogRoles);
router.get('/enclosures', auth,checkRole([1,2,3]),catalogController.getCatalogEnclosure);
router.get('/coupons', auth,checkRole([1,2,3]),catalogController.getCatalogCoupons);
router.get('/universitiesWithAllInfo', auth, checkRole([1, 2, 3]), catalogController.getUniversitiesWithAllInfo);

module.exports = router;
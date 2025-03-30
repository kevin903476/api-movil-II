const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catologosController');
//rutas publicas para el frontend sin autenticacion
router.get('/universities', catalogController.getCatalogUniversity);
router.get('/courses', catalogController.getCatalogCourse);
router.get('/headquarters', catalogController.getCatalogHeadquarters);
router.get('/careers', catalogController.getCatalogCareer);
router.get('/roles', catalogController.getCatalogRoles);

module.exports = router;
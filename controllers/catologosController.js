const CatalogService = require('../services/catalogService');

const getCatalogUniversity = async (req, res) => {
    try {
        const universities = await CatalogService.universityCatalog();
        console.log('Universidades obtenidas:', universities);
        return res.status(200).json({
            success: true,
            message: 'Universidades obtenidas correctamente',
            data: universities
        });
    } catch (error) {
        console.error('Error al obtener universidades:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener universidades'
        });
    }
}
const getCatalogCourse = async (req, res) => {
    try {
        const courses = await CatalogService.courseCatalog();
        console.log('Cursos obtenidos:', courses);
        return res.status(200).json({
            success: true,
            message: 'Cursos obtenidos correctamente',
            data: courses
        });
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener cursos'
        });
    }
}
const getCatalogCareer = async (req, res) => {
    try {
        const careers = await CatalogService.careerCatalog();
        console.log('Carreras obtenidas:', careers);
        return res.status(200).json({
            success: true,
            message: 'Carreras obtenidas correctamente',
            data: careers
        });
    } catch (error) {
        console.error('Error al obtener carreras:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener carreras'
        });
    }
}
const getCatalogHeadquarters = async (req, res) => {
    try {
        const headquarters = await CatalogService.headquartersCatalog();
        console.log('Sedes obtenidas:', headquarters);
        return res.status(200).json({
            success: true,
            message: 'Sedes obtenidas correctamente',
            data: headquarters
        });
    } catch (error) {
        console.error('Error al obtener sedes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener sedes'
        });
    }
}
const getCatalogRoles = async (req, res) => {
    try {
        const roles = await CatalogService.rolesCatalog();
        console.log('Roles obtenidos:', roles);
        return res.status(200).json({
            success: true,
            message: 'Roles obtenidos correctamente',
            data: roles
        });
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener roles'
        });
    }
}

const getCatalogEnclosure = async (req, res) => {
        try {
            const { sede_id } = req.query;
            
            const enclosures = await CatalogService.catalogEnclosure(
                sede_id ? parseInt(sede_id) : null
            );
            
            return res.status(200).json({
                success: true,
                message: 'Recintos obtenidos correctamente',
                data: enclosures
            });
        } catch (error) {
            console.error('Error al obtener recintos:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener recintos',
                error: error.message
            });
        }
    }

const getCatalogCoupons = async (req, res) => {
    try {
        const coupons = await CatalogService.couponCatalog();
        console.log('Cupones obtenidos:', coupons);
        return res.status(200).json({
            success: true,
            message: 'Cupones obtenidos correctamente',
            data: coupons
        });
    } catch (error) {
        console.error('Error al obtener cupones:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener cupones'
        });
    }
}
const getUniversitiesWithAllInfo = async (req, res) => {
    try {
        const universities = await CatalogService.getUniversitiesWithAllInfo();
        console.log('Universidades con toda la información:', universities);
        return res.status(200).json({
            success: true,
            message: 'Universidades con toda la información obtenidas correctamente',
            data: universities
        });
    } catch (error) {
        console.error('Error al obtener universidades con toda la información:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener universidades con toda la información'
        });
    }
}

const getClassificationCourses = async (req, res) => {
    try {
        const clasifiacion = await CatalogService.classificationCourses();
        console.log('Clasificaciones con toda la información:', clasifiacion);
        return res.status(200).json({
            success: true,
            message: 'Clasificaciones con toda la información obtenidas correctamente',
            data: clasifiacion
        });
    } catch (error) {
        console.error('Error al obtener clasificaciones con toda la información:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener clasificaciones con toda la información'
        });
    }
}

module.exports = {
    getCatalogUniversity,
    getCatalogCourse,
    getCatalogCareer,
    getCatalogHeadquarters,
    getCatalogRoles,
    getCatalogEnclosure,
    getCatalogCoupons,
    getUniversitiesWithAllInfo,
    getClassificationCourses
}
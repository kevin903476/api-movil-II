//@ts-check
const ReviewService = require('../services/reviewService');
const UserService = require('../services/userService');

const getTutorialFinishedReview = async (req, res) => {
    try {
        const estudiante = await UserService.getStudentByUserId(req.user.id);
        
        if (!estudiante || !estudiante.estudiante_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }
        
        const estudianteId = estudiante.estudiante_id;
        const tutoriales = await ReviewService.getTutorialFinishedReview(estudianteId);
        
        return res.status(200).json({
            success: true,
            message: 'Tutoriales finalizados obtenidos correctamente',
            data: tutoriales
        });
    } catch (error) {
        console.error('Error al obtener tutoriales finalizados:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener tutoriales finalizados',
            error: error.message
        });
    }
};

const insertReview = async (req, res) => {
    try {
        const { tutoria_id, profesor_id, estrellas, comentario } = req.body;
        const estudiante = await UserService.getStudentByUserId(req.user.id);
        
        if (!estudiante || !estudiante.estudiante_id) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }
        
        const estudiante_id = estudiante.estudiante_id;
        const review = {
            tutoria_id,
            estudiante_id,
            profesor_id,
            estrellas,
            comentario
        };
        
        const result = await ReviewService.insertReview(review);
        
        return res.status(201).json({
            success: true,
            message: 'Reseña registrada correctamente',
            data: result
        });
    } catch (error) {
        console.error('Error al insertar reseña:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al insertar reseña',
            error: error.message
        });
    }
}

const getReviewByProfesorId = async (req, res) => {
    try {
        const { profesor_id } = req.body;
        const reviews = await ReviewService.getReviewByProfesorId(profesor_id);
        
        return res.status(200).json({
            success: true,
            message: 'Reseñas obtenidas correctamente',
            data: reviews
        });
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener reseñas',
            error: error.message
        });
    }
}

module.exports = {
    getTutorialFinishedReview,
    insertReview,
    getReviewByProfesorId
}
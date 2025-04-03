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

module.exports = {
    getTutorialFinishedReview
}
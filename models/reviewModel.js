//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class ReviewModel {
    async getTutorialFinishedReview(estudianteId) {
        try {
            const result = await db.query('SELECT * FROM vista_tutoriales_finalizados WHERE estudiante_id = ?', [estudianteId]);
            const tutorialesFinalizados = result;
            console.log('Resultado de la consulta:', tutorialesFinalizados);
            return tutorialesFinalizados;
        } catch (error) {
            console.error('Error al obtener tutoriales finalizados:', error);
            throw error;
        }
    }
}
module.exports = new ReviewModel();
//@ts-check
const DbService = require('../config/database');
const db = DbService.getDbServiceInstance();

class ReviewModel {
    async getTutorialFinishedReview(estudianteId) {
        try {
            const result = await db.query('SELECT * FROM vista_tutorias_finalizadas_estudiante WHERE estudiante_id = ?', [estudianteId]);
            const tutorialesFinalizados = result;
            console.log('Resultado de la consulta:', tutorialesFinalizados);
            return tutorialesFinalizados;
        } catch (error) {
            console.error('Error al obtener tutoriales finalizados:', error);
            throw error;
        }
    }
    async insertReview(review){
        try {
            const { tutoria_id, estudiante_id, profesor_id, estrellas, comentario } = review;
            const result = await db.query('CALL sp_insertar_resena(?, ?, ?, ?, ?)',     
            [tutoria_id, estudiante_id, profesor_id, estrellas, comentario]);
            return result;
        } catch (error) {
            console.error('Error al insertar reseña:', error);
            throw error;
        }
    }

    async getReviewByProfesorId(profesorId) {
        try {
            const result = await db.query('CALL sp_obtener_resenas_profesor_json(?)', [profesorId]);
            const reviews = result[0];
            console.log('Resultado de la consulta:', reviews);
            return reviews;
        } catch (error) {
            console.error('Error al obtener reseñas del profesor:', error);
            throw error;
        }
    }
}
module.exports = new ReviewModel();
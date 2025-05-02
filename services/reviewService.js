//@ts-check
const ReviewModel = require('../models/reviewModel');

class ReviewService {
    async getTutorialFinishedReview(estudianteId) {
        return await ReviewModel.getTutorialFinishedReview(estudianteId);
    }
    async insertReview(review) {
        return await ReviewModel.insertReview(review);
    }

    async getReviewByProfesorId(profesorId) {
        // rows = [{ result: '{"success":true,...}' }] o [{ result: {…} }]
        const rows = await ReviewModel.getReviewByProfesorId(profesorId);
        if (!rows.length) {
          return { success: true, message: 'Reseñas obtenidas correctamente', data: [] };
        }
      
        const raw = rows[0].result;
        // Si viene como string, lo parseamos; si ya es objeto, lo usamos directo
        const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return payload;
      }
}

module.exports = new ReviewService();
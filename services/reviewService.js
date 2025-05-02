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
        return await ReviewModel.getReviewByProfesorId(profesorId);
    }
}

module.exports = new ReviewService();
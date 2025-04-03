//@ts-check
const ReviewModel = require('../models/reviewModel');

class ReviewService {
    async getTutorialFinishedReview(estudianteId) {
        return await ReviewModel.getTutorialFinishedReview(estudianteId);
    }
    async insertReview(review) {
        return await ReviewModel.insertReview(review);
    }
}

module.exports = new ReviewService();
//@ts-check
const ReviewModel = require('../models/reviewModel');

class ReviewService {
    async getTutorialFinishedReview(estudianteId) {
        return await ReviewModel.getTutorialFinishedReview(estudianteId);
    }
}

module.exports = new ReviewService();
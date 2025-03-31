//@ts-check
const TutorialsModel= require('../models/tutorialsModel');

class TutorialsService {
    async getTutorials() {
        return await TutorialsModel.getTutorials();
    }
    async getScheduledTutorials() {
        return await TutorialsModel.getScheduledTutorials();
    }
    async scheduleTutoring(tutoria) {
        return await TutorialsModel.scheduleTutoring(tutoria)
    }


}
module.exports = new TutorialsService();
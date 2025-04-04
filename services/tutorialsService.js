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

    async getTutorialsProfessorCourse(porfesor_id, curso_id) {
        return await TutorialsModel.getTutorialsProfessorCourse(porfesor_id, curso_id);
    }


}
module.exports = new TutorialsService();
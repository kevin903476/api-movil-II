//@ts-check
const TutorialsModel= require('../models/tutorialsModel');

class TutorialsService {
    async getTutorials() {
        return await TutorialsModel.getTutorials();
    }
    async getPendingTutorialProfessor(profesor_id, curso_id, fecha) {
        return await TutorialsModel.getPendingTutorialProfessor(profesor_id, curso_id, fecha);
    }
    async getScheduledTutorials(estudiante_id) {
        return await TutorialsModel.getScheduledTutorials(estudiante_id);
    }
    async scheduleTutoring(tutoria) {
        return await TutorialsModel.scheduleTutoring(tutoria)
    }

    async getTutorialsProfessorCourse(porfesor_id, curso_id) {
        return await TutorialsModel.getTutorialsProfessorCourse(porfesor_id, curso_id);
    }


}
module.exports = new TutorialsService();
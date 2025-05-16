//@ts-check
const TutorialsModel = require('../models/tutorialsModel');

class TutorialsService {
    async getTutorials({
        limit,
        offset,
        keyword,
        clasificacion,
        modalidad,
        pais,
        carrera,
        universidad
    }) {
        // Llamamos directamente al modelo, que devuelve { rows, total }
        const result = await TutorialsModel.getTutorials({
            limit,
            offset,
            keyword,
            clasificacion,
            modalidad,
            pais,
            carrera,
            universidad
        });
        return result;
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
    async cancelTutorial(tutoria_id) {
        const result = await TutorialsModel.cancelTutorial(tutoria_id);
        const rows = Array.isArray(result) && Array.isArray(result[0])
            ? result[0]
            : [];
        if (rows.length === 0) {
            throw new Error('No se encontró la tutoría con el ID proporcionado');
        }
        return rows[0];
    }


}
module.exports = new TutorialsService();
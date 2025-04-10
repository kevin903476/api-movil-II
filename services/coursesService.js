//@ts-check
const CoursesModel = require('../models/coursesModel');

class CoursesService {
    async getCourses() {
        return await CoursesModel.getCourses();
    }
    async getCoursesProfessor(profesor_id) {
        return await CoursesModel.getCoursesProfessor(profesor_id);
    }
    async createCourse(curso) {
        return await CoursesModel.createCourse(curso);
    }
    async insertCourseScheduleProfessor(curso_profesor) {
        return await CoursesModel.insertCourseScheduleProfessor(curso_profesor);
    }
    async searchCoursesByKeywordAndClassification(keyword, clasificacion_id) {
        return await CoursesModel.searchCoursesByKeywordAndClassification(keyword, clasificacion_id);
    }
    async logicalDeleteCourse(curso_id) {
        try {
            if (!curso_id) {
                throw new Error('El ID del curso es requerido para eliminarlo.');
            }
            const result = await CoursesModel.logicalDeleteCourse(curso_id);
            return result;
        }
        catch (error) {
            console.error('Error al eliminar el curso:', error);
            throw error;
        }
    }

}
module.exports = new CoursesService();
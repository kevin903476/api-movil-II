//@ts-check
const CoursesModel = require('../models/coursesModel');

class CoursesService {
    async getCourses() {
        return await CoursesModel.getCourses();
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

}
module.exports = new CoursesService();
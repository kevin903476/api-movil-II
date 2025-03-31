//@ts-check
const CoursesModel= require('../models/coursesModel');

class CoursesService {
    async getCourses() {
        return await CoursesModel.getCourses();
    }
    async createCourse(curso) {
        return await CoursesModel.createCourse(curso);
    }
    async insertCourseScheduleProfessor(curso_profesor) {
        return await CoursesModel.createCourse(curso_profesor);
    }

}
module.exports = new CoursesService();
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
    async deleteCourseProfessor(curso_profesor_id, profesor_id) {
        try {
            if (!curso_profesor_id || !profesor_id) {
                throw new Error('El ID del curso y el ID del profesor son requeridos para eliminar la relación.');
            }
            const result = await CoursesModel.deleteCourseProfessor(curso_profesor_id, profesor_id);
            return result;
        }
        catch (error) {
            console.error('Error al eliminar la relación curso-profesor:', error);
            throw error;
        }
    }
    async updateCourseProfessor(curso_profesor_id, curso_profesor) {
        try {
            if (!curso_profesor_id || !curso_profesor) {
                throw new Error('El ID del curso_profesor y los datos actualizados son requeridos.');
            }

            curso_profesor.curso_profesor_id = curso_profesor_id;

            const result = await CoursesModel.updateCourseProfessor(curso_profesor);
            return result;
        }
        catch (error) {
            console.error('Error al actualizar la relación curso-profesor:', error);
            throw error;
        }
    }
    async updateCourseAdmin(usuario_id, curso_id, nombre, descripcion) {
        try {
            const result = await CoursesModel.updateCourseAdmin(usuario_id, curso_id, nombre, descripcion);
            return result;
        }
        catch (error) {
            console.error('Error al actualizar el curso:', error);
            throw error;
        }
    }

}
module.exports = new CoursesService();
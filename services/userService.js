const bcryptjs = require('bcryptjs');
const UserRegisterModel = require('../models/userModel');

class UserService {

    async getAll() {
        return await UserRegisterModel.getAll();
    }
    async verifyExistingEmail(email) {
        return await UserRegisterModel.verifyExistingEmail(email);
    }
    async registerEstudiante(estudiante) {
        estudiante.password = await bcryptjs.hash(estudiante.password, 10);
        return await UserRegisterModel.registerEstudiante(estudiante);
    }
    async getProfileStudent(usuario_id) {
        return await UserRegisterModel.getProfileStudent(usuario_id);
    }
    async updateStudent(student) {
        return await UserRegisterModel.updateEstudiante(student);
    }
    async updateProfesor(profesor) {
        return await UserRegisterModel.updateProfesor(profesor);
    }
    async registerProfesor(profesor) {
        profesor.password = await bcryptjs.hash(profesor.password, 10);
        return await UserRegisterModel.registerProfesor(profesor);
    }
    async getStudentByUserId(usuario_id) {
        return await UserRegisterModel.getStudentByUserId(usuario_id);
    }
    async getProfesorByUserId(usuario_id) {
        return await UserRegisterModel.getProfesorByUserId(usuario_id);
    }
    async getProfileProfesor(usuario_id) {
        try {
            if (!usuario_id) {
                return null;
            }
            const result = await UserRegisterModel.getProfileProfesor(usuario_id);
            return result;

        } catch (error) {
            console.error('Error en getProfileProfesor:', error);
            throw error;
        }
    }
}
module.exports = new UserService();
const bcryptjs = require('bcryptjs');
const UserRegisterModel = require('../models/userModel');

class UserService {
    async getAll() {
        return await UserRegisterModel.getAll();
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
}
module.exports = new UserService();
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
}
module.exports = new UserService();